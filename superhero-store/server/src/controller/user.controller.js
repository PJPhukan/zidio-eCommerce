import { User } from "../models/user.model.js";
import { ApiError } from "../utils/ApiError.js";
import { AsyncHandler } from "../utils/asyncHandler.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import {
  CompareHashedPassword,
  encodeAuthToken,
  GenerateHashedPassword,
  generateOTP,
} from "../libs/auth.helpers.js";
import admin from "../config/firebase.js";
import { transporter } from "../config/nodemailer.js";

//REGISTER USER
const register = AsyncHandler(async (req, res) => {
  const { firstName, lastName, email, password, phoneNumber } = req.body;

  if (!firstName && !lastName && !email && !password && !phoneNumber) {
    throw new ApiError(400, "All field are required");
  }

  let user = await User.findOne({ $or: [{ email }, { phoneNumber }] });

  if (user) {
    throw new ApiError(409, "User Already exist");
  }

  const securePassword = await GenerateHashedPassword(password);

  user = await User.create({
    firstName,
    lastName,
    email,
    password: securePassword,
    phoneNumber,
  });

  user = await User.findById(user._id).select("-password");

  if (!user) {
    throw new ApiError(500, "Internal server error !!");
  }
  const options = {
    httpOnly: true,
    secure: true, // Secure in production
    sameSite: "Strict", // Helps protect against CSRF attacks
    maxAge: 1000 * 60 * 60 * 24 * 7, // 1 week
  };
  const payload = {
    _id: user._id,
    email: user.email,
  };

  // Generate JWT token
  const token = encodeAuthToken(payload);

  return res
    .status(200)
    .cookie("authToken", token, options)
    .json(
      new ApiResponse(200, { user, token }, "User successfully registered")
    );
});

//USER LOGIN
const Login = AsyncHandler(async (req, res) => {
  const { email, password } = req.body;

  if (!email && !password) {
    throw new ApiError(400, "username and password are required !");
  }
  let user = await User.findOne({ email });

  if (!user) {
    throw new ApiError(404, "Please authenticate with valid credentials");
  }
  const checkPassword = await CompareHashedPassword(password, user.password);
  if (!checkPassword) {
    throw new ApiError(401, "Incorrect password");
  }

  user = await User.findById(user._id).select("-password");

  const options = {
    httpOnly: false,
    secure: false, // Secure in production
    sameSite: "Strict", // Helps protect against CSRF attacks
    maxAge: 1000 * 60 * 60 * 24 * 7, // 1 week
  };
  const payload = {
    _id: user._id,
    email: user.email,
  };

  const token = encodeAuthToken(payload);

  return res
    .status(200)
    .cookie("authToken", token, options)
    .json(new ApiResponse(200, { user, token }, "User successfully logged in"));
});

//register with social media
const registerWithSocialMedia = AsyncHandler(async (req, res) => {
  const authToken = req.headers.authorization.split(" ")[1];

  const decodeValue = await admin.auth().verifyIdToken(authToken);
  if (!decodeValue) {
    throw new ApiError(401, "Invalid token !");
  }
  const { email, name } = decodeValue;
  let user = await User.findOne({ email });
  if (!user) {
    user = await User.create({
      email,
      firstName: name.split(" ")[0],
      lastName: name.split(" ")[1],
      password: null,
    });
  }
  user = await User.findById(user._id).select("-password");
  if (!user) {
    throw new ApiError(500, "Internal server error !!");
  }
  const options = {
    httpOnly: true,
    secure: true, // Secure in production
    sameSite: "Strict", // Helps protect against CSRF attacks
    maxAge: 1000 * 60 * 60 * 24 * 7, // 1 week
  };
  const payload = {
    _id: user._id,
    email: user.email,
  };
  // Generate JWT token
  const token = encodeAuthToken(payload);
  return res
    .status(200)
    .cookie("authToken", token, options)
    .json(
      new ApiResponse(200, { user, token }, "User successfully registered")
    );
});

//login with social media
const loginWithSocialMedia = AsyncHandler(async (req, res) => {
  const authToken = req.headers.authorization.split(" ")[1];

  const decodeValue = await admin.auth().verifyIdToken(authToken);
  if (!decodeValue) {
    throw new ApiError(401, "Invalid token !");
  }
  const { email } = decodeValue;
  const user = await User.findOne({ email });

  if (!user) {
    throw new ApiError(404, "User not found. Please register first.");
  }

  const options = {
    httpOnly: true,
    secure: true, // Secure in production
    sameSite: "Strict", // Helps protect against CSRF attacks
    maxAge: 1000 * 60 * 60 * 24 * 7, // 1 week
  };
  const payload = {
    _id: user._id,
    email: user.email,
  };

  // Generate JWT token
  const token = encodeAuthToken(payload);

  return res
    .status(200)
    .cookie("authToken", token, options)
    .json(new ApiResponse(200, { user, token }, "User successfully logged in"));
});

// Generate OTP

// Forgot Password - Request OTP
const forgotPassword = AsyncHandler(async (req, res) => {
  const { email } = req.body;

  if (!email) {
    throw new ApiError(400, "Email is required");
  }

  const user = await User.findOne({ email });

  if (!user) {
    throw new ApiError(404, "User not found");
  }

  const otp = generateOTP();
  const otpExpiry = Date.now() + 10 * 60 * 1000; // 10 minutes

  user.verificationCode = otp;
  user.verificationExpiry = otpExpiry;
  await user.save();

  const info = await transporter.sendMail({
    from: '"Support Team 👨‍💻" <support@example.com>', // sender address
    to: email, // recipient's email
    subject: "Password Reset Verification Code", // subject line
    text: `Your password reset verification code is: ${otp}`, // plain text body
    html: `
    <p>Hello,</p>
    <p>You recently requested to reset your password. Please use the verification code below to proceed:</p>
    <h2>${otp}</h2>
    <p>If you did not request this, please ignore this email.</p>
    <p>Thanks,<br/>The Support Team</p>
  `,
  });

  if (!info) {
    throw new ApiError(500, "Failed to send OTP. Please try again later.");
  }
  return res
    .status(200)
    .json(new ApiResponse(200, null, "OTP sent to your email"));
});

// Verify OTP
const verifyOTP = AsyncHandler(async (req, res) => {
  const { email, otp } = req.body;

  if (!email || !otp) {
    throw new ApiError(400, "Email and OTP are required");
  }

  const user = await User.findOne({ email });

  if (!user) {
    throw new ApiError(404, "User not found");
  }

  if (user.verificationCode !== otp || user.verificationExpiry < Date.now()) {
    throw new ApiError(400, "Invalid or expired OTP");
  }

  user.verificationCode = null;
  user.verificationExpiry = null;
  await user.save();

  return res
    .status(200)
    .json(new ApiResponse(200, null, "OTP verified successfully"));
});

// Reset Password
const resetPassword = AsyncHandler(async (req, res) => {
  const { email, newPassword } = req.body;

  if (!email || !newPassword) {
    throw new ApiError(400, "Email and new password are required");
  }

  const user = await User.findOne({ email });

  if (!user) {
    throw new ApiError(404, "User not found");
  }

  const hashedPassword = await GenerateHashedPassword(newPassword);

  user.password = hashedPassword;
  await user.save();

  return res
    .status(200)
    .json(new ApiResponse(200, null, "Password reset successfully"));
});

export {
  register,
  Login,
  registerWithSocialMedia,
  loginWithSocialMedia,
  forgotPassword,
  verifyOTP,
  resetPassword,
};
