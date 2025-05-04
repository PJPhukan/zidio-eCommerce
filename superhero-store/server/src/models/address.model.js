import mongoose from "mongoose";

const orderSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    phoneNumber: {
      type: String,
      default: null,
    },
    pinCode: {
      type: String,
      default: null,
    },
    locality: {
      type: String,
      default: null,
    },
    address: {
      type: String,
      required: true,
    },
    cityDistrictTown: {
      type: String,
      required: true,
    },
    state: {
      type: String,
      required: true,
    },
    country: {
      type: String,
      required: true,
    },
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const Address = mongoose.model("Address", orderSchema);
export { Address };
