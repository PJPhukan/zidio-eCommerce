import mongoose from "mongoose";

const wishListSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    product_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Product",
      required: true,
    },
   
  },
  {
    timestamps: true,
  }
);

const Wishlist = mongoose.model("Wishlist", wishListSchema);
export { Wishlist };
