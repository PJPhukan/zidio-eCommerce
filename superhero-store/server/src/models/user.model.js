import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: true,
      trim: true,
    },
    lastName: {
      type: String,
      required: true,
      trim: true,
    },

    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    password: {
      type: String,
      trim: true,
    },
    role: {
      type: String,
      enum: ["user", "admin"],
      default: "user",
    },

    avatar: {
      type: String,
      default: null,
    },

    cloudinary_id: {
      type: String,
      default: null,
    },
    phoneNumber: {
      type: String,
      default: null,
    },
    verificationCode: {
      type: String,
      required: [true, "Verify code is required"],
    },
    verificationExpiry: {
      type: Date,
      required: [true, "Verify code expiry is required"],
    },
  },
  {
    timestamps: true,
  }
);

const User = mongoose.model("User", userSchema);
export { User };
