import { CartItem } from "../models/cart.model.js";
import { User } from "../models/user.model.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { AsyncHandler } from "../utils/asyncHandler.js";
import { Product } from "../models/product.model.js";

const addToCart = AsyncHandler(async (req, res) => {
  const { product_id } = req.body;

  if (!product_id) {
    throw new ApiError(400, "Product ID is required");
  }

  const user = await User.findById(req.user._id);

  if (!user) {
    throw new ApiError(404, "User not found");
  }

  const cartItem = await CartItem.findOne({ userId: user._id });

  if (cartItem) {
    const productIndex = cartItem.products.findIndex(
      (item) => item.product_id.toString() === product_id
    );

    if (productIndex < 0) {
      cartItem.products.push({ product_id });
    }

    await cartItem.save();
  } else {
    const newCartItem = await CartItem.create({
      userId: user._id,
      products: [{ product_id }],
    });
  }

  return res
    .status(200)
    .json(new ApiResponse(200, "Product added to cart", {}));
});

const removeFromCart = AsyncHandler(async (req, res) => {
  const { product_id } = req.body;

  if (!product_id) {
    throw new ApiError(400, "Product ID is required");
  }

  const user = await User.findById(req.user._id);

  if (!user) {
    throw new ApiError(404, "User not found");
  }

  const cartItem = await CartItem.findOne({ userId: user._id });

  if (!cartItem) {
    throw new ApiError(404, "Cart not found");
  }

  const productIndex = cartItem.products.findIndex(
    (item) => item.product_id.toString() === product_id
  );

  if (productIndex < 0) {
    throw new ApiError(404, "Product not found in cart");
  }

  cartItem.products.splice(productIndex, 1);
  await cartItem.save();

  return res
    .status(200)
    .json(new ApiResponse(200, "Product removed from cart", {}));
});

const updateCartItemQuantity = AsyncHandler(async (req, res) => {
  const { product_id, quantity } = req.body;

  if (!product_id || !quantity) {
    throw new ApiError(400, "Product ID and quantity are required");
  }

  const user = await User.findById(req.user._id);

  if (!user) {
    throw new ApiError(404, "User not found");
  }

  const cartItem = await CartItem.findOne({ userId: user._id });

  if (!cartItem) {
    throw new ApiError(404, "Cart not found");
  }

  const productIndex = cartItem.products.findIndex(
    (item) => item.product_id.toString() === product_id
  );

  if (productIndex < 0) {
    throw new ApiError(404, "Product not found in cart");
  }

  cartItem.products[productIndex].quantity = quantity;
  await cartItem.save();

  return res
    .status(200)
    .json(new ApiResponse(200, "Cart item quantity updated", {}));
});

const getCartItems = AsyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);

  if (!user) {
    throw new ApiError(404, "User not found");
  }

  const cartItems = await CartItem.aggregate([
    {
      $match: {
        userId: user._id,
      },
    },
    {
      $unwind: "$products",
    },
    {
      $lookup: {
        from: "products",
        localField: "products.product_id",
        foreignField: "_id",
        as: "productDetails",
      },
    },
    {
      $unwind: "$productDetails",
    },
    {
      $group: {
        _id: "$userId",
        products: {
          $push: {
            product_id: "$products.product_id",
            quantity: "$products.quantity",
            productDetails: "$productDetails",
          },
        },
        totalPrice: {
          $sum: {
            $multiply: ["$products.quantity", "$productDetails.price"],
          },
        },
        totalItems: {
          $sum: 1,
        },
      },
    },
  ]);

  if (!cartItems || cartItems.length === 0) {
    throw new ApiError(404, "Cart is empty");
  }

  return res
    .status(200)
    .json(
      new ApiResponse(200, "Cart items retrieved successfully", cartItems[0])
    );
});

export { addToCart, removeFromCart, updateCartItemQuantity, getCartItems };
