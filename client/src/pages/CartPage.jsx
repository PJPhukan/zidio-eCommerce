import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";

const CartPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [showLoginPopup, setShowLoginPopup] = useState(false);
  const {
    cartItems,
    cartMrpTotal,
    cartDiscountTotal,
    cartTotal,
    removeFromCart,
    updateQuantity,
  } = useCart();

  const isLoggedIn = Boolean(localStorage.getItem("authToken"));
  const hasBackgroundLocation = Boolean(location.state?.backgroundLocation);
  const shippingCharge = cartItems.length === 0 || cartTotal >= 999 ? 0 : 49;
  const payableTotal = cartTotal + shippingCharge;

  const closeCart = () => {
    if (hasBackgroundLocation) {
      navigate(-1);
      return;
    }
    navigate("/products");
  };

  const handlePlaceOrder = () => {
    if (!isLoggedIn) {
      setShowLoginPopup(true);
      return;
    }

    console.log("Place order flow starts");
  };

  return (
    <section
      className="fixed inset-0 z-[70] bg-black/60"
      onClick={closeCart}
      aria-label="Cart drawer overlay"
    >
      <aside
        className="ml-auto h-full w-full max-w-xl bg-gray-900 text-white border-l border-gray-700 shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="h-full flex flex-col">
          <div className="p-5 border-b border-gray-700 flex items-center justify-between">
            <h1 className="text-2xl font-bold">My Cart</h1>
            <button
              type="button"
              onClick={closeCart}
              className="px-3 py-1 rounded-lg bg-gray-800 hover:bg-gray-700"
            >
              Close
            </button>
          </div>

          <div className="flex-1 overflow-y-auto p-5 space-y-4">
            {cartItems.length === 0 && (
              <div className="bg-gray-800 rounded-xl p-5 text-gray-300">
                Your cart is empty.{" "}
                <Link
                  to="/products"
                  onClick={(e) => {
                    if (hasBackgroundLocation) {
                      e.preventDefault();
                    }
                    closeCart();
                  }}
                  className="text-blue-400 hover:text-blue-300"
                >
                  Continue shopping
                </Link>
              </div>
            )}

            {cartItems.map((item) => (
              <div
                key={`${item.id}-${item.size}`}
                className="bg-gray-800 rounded-xl p-4 flex gap-3"
              >
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-20 h-20 rounded-lg object-cover"
                />
                <div className="flex-1">
                  <p className="font-semibold">{item.name}</p>
                  <p className="text-gray-400 text-sm">
                    Size: {item.size || "Default"}
                  </p>
                  {item.offPercent > 0 ? (
                    <div className="mt-1">
                      <p className="text-green-400 text-xs font-medium">
                        {item.offPercent}% OFF
                      </p>
                      <p className="text-gray-300 text-sm font-semibold">
                        Rs.{" "}
                        {(
                          item.price *
                          (1 - (item.offPercent || 0) / 100) *
                          item.quantity
                        ).toFixed(2)}
                      </p>
                      <p className="text-gray-500 line-through text-xs">
                        Rs. {(item.price * item.quantity).toFixed(2)}
                      </p>
                    </div>
                  ) : (
                    <p className="text-gray-300 text-sm font-semibold mt-1">
                      Rs. {(item.price * item.quantity).toFixed(2)}
                    </p>
                  )}
                </div>
                <div className="flex flex-col items-end justify-between min-w-[132px]">
                  <div className="flex items-center gap-2 mt-3">
                    <button
                      type="button"
                      onClick={() => {
                        if (item.quantity === 1) {
                          removeFromCart(item.id, item.size);
                        } else {
                          updateQuantity(item.id, item.size, item.quantity - 1);
                        }
                      }}
                      className="w-8 h-8 rounded-full bg-gray-700 hover:bg-gray-600"
                      aria-label={`Decrease quantity of ${item.name}`}
                    >
                      -
                    </button>
                    <span className="min-w-6 text-center">{item.quantity}</span>
                    <button
                      type="button"
                      onClick={() =>
                        updateQuantity(item.id, item.size, item.quantity + 1)
                      }
                      className="w-8 h-8 rounded-full bg-gray-700 hover:bg-gray-600"
                      aria-label={`Increase quantity of ${item.name}`}
                    >
                      +
                    </button>
                  </div>
                  <button
                    type="button"
                    onClick={() => removeFromCart(item.id, item.size)}
                    className="text-sm text-red-400 hover:text-red-300"
                  >
                    Remove
                  </button>
                </div>
              </div>
            ))}
          </div>

          <div className="border-t border-gray-700 p-5">
            <p className="text-white font-semibold mb-3">Payment Breakup</p>
            <div className="space-y-2 mb-4 text-sm">
              <div className="flex items-center justify-between text-gray-300">
                <span>MRP Total</span>
                <span>Rs. {cartMrpTotal.toFixed(2)}</span>
              </div>
              <div className="flex items-center justify-between text-green-400">
                <span>Discount</span>
                <span>- Rs. {cartDiscountTotal.toFixed(2)}</span>
              </div>
              <div className="flex items-center justify-between text-gray-300">
                <span>Shipping</span>
                <span>
                  {shippingCharge === 0 ? "Free" : `Rs. ${shippingCharge.toFixed(2)}`}
                </span>
              </div>
              <div className="border-t border-gray-700 pt-2 flex items-center justify-between text-base font-semibold text-white">
                <span>Total Payable</span>
                <span>Rs. {payableTotal.toFixed(2)}</span>
              </div>
            </div>
            <button
              type="button"
              onClick={handlePlaceOrder}
              className="w-full px-6 py-3 bg-blue-600 hover:bg-blue-700 rounded-full font-semibold transition-all duration-300 disabled:bg-gray-600 disabled:cursor-not-allowed"
              disabled={cartItems.length === 0}
            >
              Place Order
            </button>
          </div>
        </div>
      </aside>

      {showLoginPopup && (
        <div className="fixed inset-0 bg-black/60 z-[60] flex items-center justify-center p-4">
          <div className="w-full max-w-md bg-gray-800 rounded-2xl p-6 shadow-2xl">
            <h2 className="text-2xl font-bold mb-2">Login Required</h2>
            <p className="text-gray-300 mb-6">
              Please sign in to place your order.
            </p>
            <div className="flex flex-col sm:flex-row gap-3">
              <Link
                to="/signin"
                onClick={() => setShowLoginPopup(false)}
                className="flex-1 text-center px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded-lg font-medium"
              >
                Go To Login
              </Link>
              <button
                type="button"
                onClick={() => setShowLoginPopup(false)}
                className="flex-1 px-4 py-2 bg-gray-700 hover:bg-gray-600 rounded-lg font-medium"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default CartPage;
