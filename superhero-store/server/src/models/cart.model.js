import mongoose from "mongoose";

const cartItemSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    products: [
      {
        product_id: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Product",
          required: true,
        },
        quantity: {
          type: Number,
          default: 1,
        },
      },
    ],
    
  },
  {
    timestamps: true,
  }
);

const CartItem = mongoose.model("CartItem", cartItemSchema);
export { CartItem };
