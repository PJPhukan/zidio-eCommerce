import { Address } from "../models/address.model.js";
import { User } from "../models/user.model.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { AsyncHandler } from "../utils/asyncHandler.js";

//add address
const addAddress = AsyncHandler(async (req, res) => {
  const {
    name,
    phoneNumber,
    pinCode,
    locality,
    address,
    cityDistrictTown,
    state,
    country,
  } = req.body;

  if (!name || !address || !cityDistrictTown || !state || !country) {
    throw new ApiError(400, "All fields are required");
    
  }

  const user = await User.findById(req.user._id);

  if (!user) {
    throw new ApiError(404, "User not found");
  }

  const newAddress = await Address.create({
    name,
    phoneNumber,
    pinCode,
    locality,
    address,
    cityDistrictTown,
    state,
    country,
    owner: user._id,
  });

  return res
    .status(201)
    .json(new ApiResponse(201, "Address added successfully", newAddress));
});

//get address by id
const getAddress = AsyncHandler(async (req, res) => {
  const { id } = req.params;

  if (!id) {
    throw new ApiError(400, "Address ID is required");
  }

  const address = await Address.findById(id).populate("owner", "-password");

  if (!address) {
    throw new ApiError(404, "Address not found");
  }

  return res
    .status(200)
    .json(new ApiResponse(200, "Address fetched successfully", address));
});

//update address
const updateAddress = AsyncHandler(async (req, res) => {
  const { id } = req.params;
  const {
    name,
    phoneNumber,
    pinCode,
    locality,
    address,
    cityDistrictTown,
    state,
    country,
  } = req.body;

  if (!id) {
    throw new ApiError(400, "Address ID is required");
  }

  const addressToUpdate = await Address.findById(id);

  if (!addressToUpdate) {
    throw new ApiError(404, "Address not found");
  }

  addressToUpdate.name = name || addressToUpdate.name;
  addressToUpdate.phoneNumber = phoneNumber || addressToUpdate.phoneNumber;
  addressToUpdate.pinCode = pinCode || addressToUpdate.pinCode;
  addressToUpdate.locality = locality || addressToUpdate.locality;
  addressToUpdate.address = address || addressToUpdate.address;
  addressToUpdate.cityDistrictTown =
    cityDistrictTown || addressToUpdate.cityDistrictTown;
  addressToUpdate.state = state || addressToUpdate.state;
  addressToUpdate.country = country || addressToUpdate.country;

  await addressToUpdate.save();

  return res
    .status(200)
    .json(
      new ApiResponse(200, "Address updated successfully", addressToUpdate)
    );
});

//delete address
const deleteAddress = AsyncHandler(async (req, res) => {
  const { id } = req.params;

  if (!id) {
    throw new ApiError(400, "Address ID is required");
  }

  const addressToDelete = await Address.findById(id);

  if (!addressToDelete) {
    throw new ApiError(404, "Address not found");
  }

  await addressToDelete.remove();

  return res
    .status(200)
    .json(new ApiResponse(200, "Address deleted successfully"));
});

//get all address
const getAllAddress = AsyncHandler(async (req, res) => {
  const addresses = await Address.find({ owner: req.user._id }).populate(
    "owner",
    "-password"
  );

  return res
    .status(200)
    .json(new ApiResponse(200, "Addresses fetched successfully", addresses));
});


export {
  addAddress,
  getAddress,
  updateAddress,
  deleteAddress,
  getAllAddress,
};