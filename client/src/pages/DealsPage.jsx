import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { products } from "../data/products";

const DealsPage = () => {
  const { addToCart, removeProductFromCart, isInCart } = useCart();

  const dealProducts = [...products]
    .filter((product) => (product.offPercent || 0) > 0)
    .sort((a, b) => b.offPercent - a.offPercent);

  return (
    <section className="bg-gray-900 min-h-screen py-12 sm:py-16 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl sm:text-4xl font-bold mb-3">Today&apos;s Deals</h1>
        <p className="text-gray-300 mb-8">
          Best discounted products available right now.
        </p>

        {dealProducts.length === 0 ? (
          <p className="text-gray-300">No active deals at the moment.</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {dealProducts.map((product) => {
              const discountedPrice =
                product.price * (1 - (product.offPercent || 0) / 100);
              return (
                <div
                  key={product.id}
                  className="bg-gray-800 rounded-xl overflow-hidden border border-gray-700 hover:border-blue-500 transition-all duration-300"
                >
                  <Link to={`/products/${product.id}`}>
                    <img
                      src={product.images[0]}
                      alt={product.name}
                      className="w-full h-52 object-cover"
                    />
                  </Link>
                  <div className="p-5">
                    <p className="inline-block text-xs font-semibold bg-green-600/20 text-green-400 px-2 py-1 rounded-full mb-3">
                      {product.offPercent}% OFF
                    </p>
                    <h3 className="text-lg font-semibold mb-2">{product.name}</h3>
                    <p className="text-gray-300">
                      <span className="text-white font-semibold mr-2">
                        Rs. {discountedPrice.toFixed(2)}
                      </span>
                      <span className="line-through text-gray-500">
                        Rs. {product.price.toFixed(2)}
                      </span>
                    </p>
                    <button
                      type="button"
                      onClick={() => {
                        if (isInCart(product.id)) {
                          removeProductFromCart(product.id);
                        } else {
                          addToCart({
                            id: product.id,
                            name: product.name,
                            price: product.price,
                            image: product.images[0],
                            offPercent: product.offPercent || 0,
                            size: product.sizes[0] || "",
                            quantity: 1,
                          });
                        }
                      }}
                      className={`w-full mt-4 px-4 py-2 rounded-full font-medium transition-all duration-300 ${
                        isInCart(product.id)
                          ? "bg-red-600 hover:bg-red-700"
                          : "bg-blue-600 hover:bg-blue-700"
                      }`}
                    >
                      {isInCart(product.id) ? "Remove from Cart" : "Add to Cart"}
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
};

export default DealsPage;

