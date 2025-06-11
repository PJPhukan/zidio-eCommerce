// src/components/ProductDetailPage.jsx
import React, { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";

const ProductDetailPage = () => {
  const { id } = useParams();
  const [selectedImage, setSelectedImage] = useState(0);
  const [selectedSize, setSelectedSize] = useState("");
  const [quantity, setQuantity] = useState(1);

  // Sample product data
  const products = [
    {
      id: 1,
      name: "Marvel Avengers T-Shirt",
      price: 499,
      stock: 10,
      rating: 4.5,
      images: [
        "/src/assets/images/marvelT-shirt.jpg",
        "/src/assets/images/marvelT-shirt.jpg",
        "/src/assets/images/marvelT-shirt.jpg",
      ],
      description:
        "A vibrant Marvel Avengers T-Shirt featuring your favorite superheroes. Made from premium cotton for ultimate comfort.",
      theme: "Marvel",
      type: "Crew Neck",
      sizes: ["S", "M", "L", "XL"],
      reviews: [
        {
          user: "Tony S.",
          rating: 5,
          comment: "Awesome design, fits perfectly!",
        },
        {
          user: "Peter P.",
          rating: 4,
          comment: "Great shirt, but color fades slightly.",
        },
      ],
    },
    {
      id: 2,
      name: "Starry Night Hoodie",
      price: 999,
      stock: 5,
      rating: 4.8,
      images: [
        "/src/assets/images/sNightHoodie.jpg",
        "/src/assets/images/sNightHoodie.jpg",
        "/src/assets/images/sNightHoodie.jpg",
      ],
      description:
        "Cozy hoodie inspired by Van Gogh’s Starry Night masterpiece. Perfect for chilly evenings.",
      theme: "Starry Night",
      type: "Hoodie",
      sizes: ["M", "L", "XL"],
      reviews: [
        { user: "Emma W.", rating: 5, comment: "Super comfy and stylish!" },
        {
          user: "Liam N.",
          rating: 4.5,
          comment: "Love the print, great quality.",
        },
      ],
    },
    {
      id: 3,
      name: "DC Batman V-Neck",
      price: 699,
      stock: 0,
      rating: 4.2,
      images: [
        "/src/assets/images/batmanV-neck.jpeg",
        "/src/assets/images/batmanV-neck.jpeg",
        "/src/assets/images/batmanV-neck.jpeg",
      ],
      description:
        "Sleek V-Neck T-Shirt with Batman logo for DC fans. Lightweight and breathable.",
      theme: "DC Comics",
      type: "V-Neck",
      sizes: ["S", "L", "XL"],
      reviews: [
        {
          user: "Bruce W.",
          rating: 4,
          comment: "Cool design, but sizing runs small.",
        },
      ],
    },
    {
      id: 4,
      name: "Spider-Man Crew Neck",
      price: 899,
      stock: 8,
      rating: 4.6,
      images: [
        "/src/assets/images/spidermanCrewNeck.avif",
        "/src/assets/images/spidermanCrewNeck.avif",
        "/src/assets/images/spidermanCrewNeck.avif",
      ],
      description:
        "Classic Spider-Man crew neck T-Shirt with bold design. Perfect for Marvel fans.",
      theme: "Marvel",
      type: "Crew Neck",
      sizes: ["S", "M", "XL"],
      reviews: [
        { user: "MJ W.", rating: 5, comment: "My favorite shirt, great fit!" },
        {
          user: "Ned L.",
          rating: 4,
          comment: "Nice, but stitching could be better.",
        },
      ],
    },
    {
      id: 5,
      name: "Superman Oversized",
      price: 1999,
      stock: 12,
      rating: 4.3,
      images: [
        "/src/assets/images/superman.jpg",
        "/src/assets/images/superman.jpg",
        "/src/assets/images/superman.jpg",
      ],
      description:
        "Oversized Superman T-Shirt for a relaxed, heroic look. Soft and durable fabric.",
      theme: "DC Comics",
      type: "Oversized",
      sizes: ["M", "L", "XL"],
      reviews: [
        {
          user: "Clark K.",
          rating: 4.5,
          comment: "Really comfortable, love the fit.",
        },
      ],
    },
    {
      id: 6,
      name: "Sleeveless Iron Man",
      price: 299,
      stock: 15,
      rating: 4.0,
      images: [
        "/src/assets/images/ironman.jpg",
        "/src/assets/images/ironman.jpg",
        "/src/assets/images/ironman.jpg",
      ],
      description:
        "Sleeveless Iron Man T-Shirt, perfect for workouts. Breathable and stylish.",
      theme: "Marvel",
      type: "Sleeveless",
      sizes: ["S", "M", "L"],
      reviews: [
        {
          user: "Pepper P.",
          rating: 4,
          comment: "Great for gym, nice design.",
        },
        { user: "Rhodey J.", rating: 3.5, comment: "Good but a bit tight." },
      ],
    },
  ];

  const product = products.find((p) => p.id === Number(id));
  const relatedProducts = products
    .filter(
      (p) =>
        p.id !== Number(id) &&
        (p.theme === product?.theme || p.type === product?.type)
    )
    .slice(0, 3);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        when: "beforeChildren",
        staggerChildren: 0.1,
      },
    },
  };

  const childVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.3 } },
  };

  const imageVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { duration: 0.3 } },
    exit: { opacity: 0, transition: { duration: 0.3 } },
  };

  if (!product) {
    return (
      <motion.section
        className="bg-gray-900 py-12 sm:py-16"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        data-animate
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.h2
            className="text-2xl sm:text-3xl font-bold text-white"
            variants={childVariants}
          >
            Product Not Found
          </motion.h2>
          <motion.div variants={childVariants}>
            <Link
              to="/products"
              className="mt-4 inline-block px-6 py-3 text-sm sm:text-base bg-blue-600 hover:bg-blue-700 text-white rounded-full shadow-lg hover:shadow-xl transition-all duration-300"
              aria-label="Back to products"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              data-animate
            >
              Back to Products
            </Link>
          </motion.div>
        </div>
      </motion.section>
    );
  }

  return (
    <motion.section
      className="bg-gray-900 py-12 sm:py-16"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      data-animate
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div variants={childVariants}>
          <Link
            to="/products"
            className="text-gray-300 hover:text-blue-400 mb-6 inline-block transition-all duration-300"
            aria-label="Back to products"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            data-animate
          >
            ← Back to Products
          </Link>
        </motion.div>
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Product Images */}
          <motion.div className="w-full lg:w-1/2" variants={childVariants}>
            <AnimatePresence mode="wait">
              <motion.img
                key={selectedImage}
                src={product.images[selectedImage]}
                alt={`${product.name} view ${selectedImage + 1}`}
                className="w-full h-64 sm:h-96 object-cover rounded-lg shadow-lg"
                variants={imageVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
                data-animate
              />
            </AnimatePresence>
            <motion.div
              className="flex gap-2 mt-4 overflow-x-auto"
              variants={containerVariants}
            >
              {product.images.map((img, index) => (
                <motion.button
                  key={index}
                  onClick={() => setSelectedImage(index)}
                  className={`w-16 h-16 sm:w-20 sm:h-20 rounded-md shadow-md hover:shadow-lg transition-all duration-300 ${
                    selectedImage === index ? "ring-2 ring-blue-600" : ""
                  }`}
                  aria-label={`View image ${index + 1} of ${product.name}`}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  data-animate
                >
                  <img
                    src={img}
                    alt={`${product.name} thumbnail ${index + 1}`}
                    className="w-full h-full object-cover rounded-md"
                  />
                </motion.button>
              ))}
            </motion.div>
          </motion.div>

          {/* Product Details */}
          <motion.div className="flex-1" variants={childVariants}>
            <motion.h1
              className="text-2xl sm:text-3xl font-bold text-white mb-4"
              variants={childVariants}
            >
              {product.name}
            </motion.h1>
            <motion.p
              className="text-gray-300 text-lg mb-2"
              variants={childVariants}
            >
              ₹{product.price.toFixed(2)}
            </motion.p>
            <motion.p
              className={`text-sm mb-4 ${
                product.stock > 0 ? "text-green-400" : "text-red-400"
              }`}
              variants={childVariants}
            >
              {product.stock > 0
                ? `In Stock (${product.stock} left)`
                : "Out of Stock"}
            </motion.p>
            <motion.div
              className="flex items-center mb-4"
              variants={childVariants}
            >
              {[...Array(5)].map((_, i) => (
                <svg
                  key={i}
                  className={`w-5 h-5 ${
                    i < Math.round(product.rating)
                      ? "text-yellow-400"
                      : "text-gray-600"
                  }`}
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                  aria-hidden="true"
                >
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
              ))}
            </motion.div>
            <motion.p className="text-gray-300 mb-6" variants={childVariants}>
              {product.description}
            </motion.p>

            {/* Theme and Type */}
            <motion.div className="flex gap-2 mb-6" variants={childVariants}>
              <span className="px-3 py-1 bg-gray-700 text-gray-300 text-sm rounded-full">
                Theme: {product.theme}
              </span>
              <span className="px-3 py-1 bg-gray-700 text-gray-300 text-sm rounded-full">
                Type: {product.type}
              </span>
            </motion.div>

            {/* Size Selector */}
            <motion.div className="mb-6" variants={childVariants}>
              <label
                htmlFor="size"
                className="text-white font-semibold mb-2 block"
              >
                Select Size
              </label>
              <motion.select
                id="size"
                value={selectedSize}
                onChange={(e) => setSelectedSize(e.target.value)}
                className="w-full sm:w-48 p-2 rounded bg-gray-700 text-white focus:ring-2 focus:ring-blue-500"
                disabled={product.stock === 0}
                aria-label="Select size"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                data-animate
              >
                <option value="">Choose Size</option>
                {product.sizes.map((size) => (
                  <option key={size} value={size}>
                    {size}
                  </option>
                ))}
              </motion.select>
            </motion.div>

            {/* Quantity Selector */}
            <motion.div className="mb-6" variants={childVariants}>
              <label
                htmlFor="quantity"
                className="text-white font-semibold mb-2 block"
              >
                Quantity
              </label>
              <motion.input
                id="quantity"
                type="number"
                min="1"
                max={product.stock}
                value={quantity}
                onChange={(e) => setQuantity(Number(e.target.value))}
                className="w-20 p-2 rounded bg-gray-700 text-white focus:ring-2 focus:ring-blue-500"
                disabled={product.stock === 0}
                aria-label="Select quantity"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                data-animate
              />
            </motion.div>

            {/* Buttons */}
            <motion.div
              className="flex flex-col sm:flex-row gap-4 mb-8"
              variants={childVariants}
            >
              <motion.button
                className="w-full sm:w-auto px-6 py-3 text-sm sm:text-base bg-blue-600 hover:bg-blue-700 text-white rounded-full shadow-lg hover:shadow-xl transition-all duration-300 disabled:bg-gray-600 disabled:cursor-not-allowed"
                disabled={product.stock === 0 || !selectedSize}
                aria-label="Add to cart"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                data-animate
              >
                Add to Cart
              </motion.button>
              <motion.button
                className="w-full sm:w-auto px-6 py-3 text-sm sm:text-base bg-gray-700 hover:bg-gray-600 text-white rounded-full shadow-lg hover:shadow-xl transition-all duration-300 disabled:bg-gray-600 disabled:cursor-not-allowed"
                disabled={product.stock === 0 || !selectedSize}
                aria-label="Buy now"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                data-animate
              >
                Buy Now
              </motion.button>
            </motion.div>
          </motion.div>
        </div>

        {/* Customer Reviews */}
        <motion.div className="mt-12" variants={childVariants}>
          <motion.h2
            className="text-xl sm:text-2xl font-bold text-white mb-6"
            variants={childVariants}
          >
            Customer Reviews
          </motion.h2>
          {product.reviews.length === 0 ? (
            <motion.p className="text-gray-300" variants={childVariants}>
              No reviews yet.
            </motion.p>
          ) : (
            <motion.div className="space-y-6" variants={containerVariants}>
              {product.reviews.map((review, index) => (
                <motion.div
                  key={index}
                  className="bg-gray-800 p-4 sm:p-6 rounded-lg shadow-lg"
                  variants={childVariants}
                  custom={index}
                >
                  <div className="flex items-center mb-2">
                    <span className="text-white font-semibold mr-2">
                      {review.user}
                    </span>
                    <div className="flex">
                      {[...Array(5)].map((_, i) => (
                        <svg
                          key={i}
                          className={`w-4 h-4 ${
                            i < Math.round(review.rating)
                              ? "text-yellow-400"
                              : "text-gray-600"
                          }`}
                          fill="currentColor"
                          viewBox="0 0 20 20"
                          xmlns="http://www.w3.org/2000/svg"
                          aria-hidden="true"
                        >
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                        </svg>
                      ))}
                    </div>
                  </div>
                  <p className="text-gray-300">{review.comment}</p>
                </motion.div>
              ))}
            </motion.div>
          )}
        </motion.div>

        {/* Related Products */}
        <motion.div className="mt-12" variants={childVariants}>
          <motion.h2
            className="text-xl sm:text-2xl font-bold text-white mb-6"
            variants={childVariants}
          >
            Related Products
          </motion.h2>
          {relatedProducts.length === 0 ? (
            <motion.p className="text-gray-300" variants={childVariants}>
              No related products found.
            </motion.p>
          ) : (
            <motion.div
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8"
              variants={containerVariants}
            >
              {relatedProducts.map((related, index) => (
                <motion.div
                  key={related.id}
                  variants={childVariants}
                  custom={index}
                >
                  <Link
                    to={`/products/${related.id}`}
                    className="block bg-gray-800 rounded-lg overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300"
                    aria-label={`View details for ${related.name}`}
                  >
                    <motion.img
                      src={related.images[0]}
                      alt={related.name}
                      className="w-full h-48 sm:h-56 object-cover"
                      whileHover={{ scale: 1.1 }}
                      transition={{ duration: 0.3 }}
                      data-animate
                    />
                    <div className="p-4 sm:p-6 pt-4 sm:pt-6">
                      <h3 className="text-lg sm:text-xl font-semibold text-white mb-2">
                        {related.name}
                      </h3>
                      <p className="text-gray-300 mb-2">
                        ₹{related.price.toFixed(2)}
                      </p>
                      <div className="flex items-center mb-4">
                        {[...Array(5)].map((_, i) => (
                          <svg
                            key={i}
                            className={`w-4 h-4 ${
                              i < Math.round(related.rating)
                                ? "text-yellow-400"
                                : "text-gray-600"
                            }`}
                            fill="currentColor"
                            viewBox="0 0 20 20"
                            xmlns="http://www.w3.org/2000/svg"
                            aria-hidden="true"
                          >
                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                          </svg>
                        ))}
                      </div>
                      <motion.button
                        className="w-full px-4 py-2 text-sm sm:text-base bg-blue-600 hover:bg-blue-700 text-white rounded-full shadow-lg hover:shadow-xl transition-all duration-300"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        data-animate
                      >
                        Add to Cart
                      </motion.button>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </motion.div>
          )}
        </motion.div>
      </div>
    </motion.section>
  );
};

export default ProductDetailPage;
