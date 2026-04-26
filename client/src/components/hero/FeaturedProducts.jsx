// src/components/FeaturedProducts.jsx
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { useCart } from "../../context/CartContext";
import { products } from "../../data/products";

const FeaturedProducts = () => {
  const { addToCart, removeFromCart, isInCart } = useCart();
  const featuredProducts = products.slice(0, 4).map((product) => ({
    ...product,
    image: product.images[0],
  }));

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.3 } },
  };

  return (
    <motion.section
      className="bg-gray-900 py-12 sm:py-16"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      data-animate
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.h2
          className="text-2xl sm:text-3xl font-bold text-white mb-6 sm:mb-8 text-center"
          variants={cardVariants}
        >
          Featured Products
        </motion.h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {featuredProducts.map((product) => (
            <motion.div key={product.id} variants={cardVariants}>
              <Link
                to={`/products/${product.id}`}
                className="block bg-gray-800 rounded-lg overflow-hidden shadow-lg hover:shadow-2xl transform hover:scale-105 transition-all duration-300"
                aria-label={`View details for ${product.name}`}
              >
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-48 sm:h-56 object-cover transform hover:scale-110 transition-all duration-300"
                />
                <div className="p-4 sm:p-6 pt-4 sm:pt-6">
                  <h3 className="text-lg sm:text-xl font-semibold text-white mb-2">
                    {product.name}
                  </h3>
                  <p className="text-gray-300 mb-4">
                    ₹{product.price.toFixed(2)}
                  </p>
                  <button
                    type="button"
                    onClick={(e) => {
                      e.preventDefault();
                      const quickSize = product.sizes?.[0] || "";
                      if (isInCart(product.id, quickSize)) {
                        removeFromCart(product.id, quickSize);
                      } else {
                        addToCart({
                          id: product.id,
                          name: product.name,
                          price: product.price,
                          image: product.image,
                          offPercent: product.offPercent || 0,
                          size: quickSize,
                          quantity: 1,
                        });
                      }
                    }}
                    className={`w-full px-4 py-2 text-sm sm:text-base text-white rounded-full shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 ${
                      isInCart(product.id, product.sizes?.[0] || "")
                        ? "bg-red-600 hover:bg-red-700"
                        : "bg-blue-600 hover:bg-blue-700"
                    }`}
                  >
                    {isInCart(product.id, product.sizes?.[0] || "")
                      ? "Remove from Cart"
                      : "Add to Cart"}
                  </button>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.section>
  );
};

export default FeaturedProducts;
