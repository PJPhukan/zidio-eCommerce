import React, { useState, useEffect, useMemo } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";

// Placeholder for local images (replace with your own assets)
const placeholderImage = "/images/placeholder.jpg"; // Add a local placeholder image

const ProductListingPage = () => {
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [filters, setFilters] = useState({
    tshirtType: [],
    priceRange: [299, 2000],
    size: [],
    rating: 0,
  });
  const [sortOption, setSortOption] = useState("newest");

  // Sample product data with a createdAt field for "newest" sorting
  const products = [
    {
      id: 1,
      name: "Marvel Avengers T-Shirt",
      price: 499,
      rating: 4.5,
      image: "/src/assets/images/marvelT-shirt.jpg",
      type: "Crew Neck",
      size: ["S", "M", "L"],
      createdAt: "2025-05-01",
    },
    {
      id: 2,
      name: "Starry Night Hoodie",
      price: 999,
      rating: 4.8,
      image: "/src/assets/images/sNightHoodie.jpg",
      type: "Hoodie",
      size: ["M", "L", "XL"],
      createdAt: "2025-04-15",
    },
    {
      id: 3,
      name: "DC Batman V-Neck",
      price: 699,
      rating: 4.2,
      image: "/src/assets/images/batmanV-neck.jpeg",
      type: "V-Neck",
      size: ["S", "L", "XL"],
      createdAt: "2025-03-10",
    },
    {
      id: 4,
      name: "Spider-Man Crew Neck",
      price: 899,
      rating: 4.6,
      image: "/src/assets/images/spidermanCrewNeck.avif",
      type: "Crew Neck",
      size: ["S", "M", "XL"],
      createdAt: "2025-05-20",
    },
    {
      id: 5,
      name: "Superman Oversized",
      price: 1999,
      rating: 4.3,
      image: "/src/assets/images/superman.jpg",
      type: "Oversized",
      size: ["M", "L", "XL"],
      createdAt: "2025-02-25",
    },
    {
      id: 6,
      name: "Sleeveless Iron Man",
      price: 299,
      rating: 4.0,
      image: "/src/assets/images/ironman.jpg",
      type: "Sleeveless",
      size: ["S", "M", "L"],
      createdAt: "2025-01-30",
    },
  ];

  // Optimize filtering with useMemo
  const filteredProducts = useMemo(() => {
    let result = [...products];
    result = result.filter((product) => {
      const typeMatch =
        filters.tshirtType.length === 0 ||
        filters.tshirtType.includes(product.type);
      const priceMatch =
        product.price >= filters.priceRange[0] &&
        product.price <= filters.priceRange[1];
      const sizeMatch =
        filters.size.length === 0 ||
        filters.size.some((size) => product.size.includes(size));
      const ratingMatch =
        filters.rating === 0 || product.rating >= filters.rating;
      return typeMatch && priceMatch && sizeMatch && ratingMatch;
    });

    // Sorting logic with "newest" support
    return result.sort((a, b) => {
      if (sortOption === "price-low") return a.price - b.price;
      if (sortOption === "price-high") return b.price - a.price;
      if (sortOption === "rating") return b.rating - a.rating;
      if (sortOption === "newest")
        return new Date(b.createdAt) - new Date(a.createdAt);
      return 0;
    });
  }, [filters, sortOption, products]);

  const tshirtTypes = [
    "Oversized",
    "Sleeveless",
    "Crew Neck",
    "V-Neck",
    "Hoodie",
  ];
  const sizes = ["S", "M", "L", "XL"];
  const sortOptions = [
    { value: "newest", label: "Newest" },
    { value: "price-low", label: "Price: Low to High" },
    { value: "price-high", label: "Price: High to Low" },
    { value: "rating", label: "Highest Rated" },
  ];

  const handleFilterChange = (key, value) => {
    setFilters((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  // Handle Add to Cart (placeholder for actual implementation)
  const handleAddToCart = (product) => {
    console.log(`Added ${product.name} to cart`);
    // Integrate with a cart context or state management (e.g., Redux, Zustand)
  };

  // Animation variants
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

  const filterVariants = {
    hidden: { x: "-100%" },
    visible: { x: 0, transition: { duration: 0.3 } },
    exit: { x: "-100%", transition: { duration: 0.3 } },
  };

  // Handle window resize for filter visibility
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) setIsFilterOpen(true);
      else setIsFilterOpen(false);
    };
    window.addEventListener("resize", handleResize);
    handleResize(); // Initial check
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <motion.section
      className="bg-gray-900 py-12 sm:py-16"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row gap-6">
          {/* Filters Sidebar (Left) */}
          <motion.div className="lg:w-1/4" variants={childVariants}>
            <div className="flex items-center justify-between mb-4 lg:mb-0">
              <h2 className="text-xl sm:text-2xl font-bold text-white">
                Filters
              </h2>
              <motion.button
                onClick={() => setIsFilterOpen(!isFilterOpen)}
                className="text-gray-300 hover:text-blue-400 transform hover:scale-110 transition-all duration-300 lg:hidden"
                aria-label={isFilterOpen ? "Close filters" : "Open filters"}
                aria-expanded={isFilterOpen}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
              >
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d={
                      isFilterOpen
                        ? "M6 18L18 6M6 6l12 12"
                        : "M4 6h16M4 12h16M4 18h16"
                    }
                  />
                </svg>
              </motion.button>
            </div>
            <AnimatePresence>
              {isFilterOpen && (
                <motion.div
                  id="filter-sidebar"
                  className="bg-gray-800 p-4 sm:p-6 rounded-lg shadow-lg"
                  variants={filterVariants}
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                >
                  {/* T-Shirt Type */}
                  <div className="mb-6">
                    <h3 className="text-lg font-semibold text-white mb-2">
                      T-Shirt Type
                    </h3>
                    {tshirtTypes.map((type) => (
                      <label key={type} className="flex items-center mb-2">
                        <input
                          type="checkbox"
                          className="form-checkbox text-blue-600 focus:ring-blue-500"
                          checked={filters.tshirtType.includes(type)}
                          onChange={(e) => {
                            const newTypes = e.target.checked
                              ? [...filters.tshirtType, type]
                              : filters.tshirtType.filter((t) => t !== type);
                            handleFilterChange("tshirtType", newTypes);
                          }}
                          aria-label={`Filter by ${type} t-shirt`}
                        />
                        <span className="ml-2 text-gray-300">{type}</span>
                      </label>
                    ))}
                  </div>

                  {/* Price Range Slider */}
                  <div className="mb-6">
                    <h3 className="text-lg font-semibold text-white mb-2">
                      Price Range
                    </h3>
                    <div className="flex flex-col space-y-4">
                      <div className="flex justify-between text-gray-300 text-sm">
                        <span>₹{filters.priceRange[0].toFixed(2)}</span>
                        <span>₹{filters.priceRange[1].toFixed(2)}</span>
                      </div>
                      <div className="relative">
                        <input
                          type="range"
                          min="0"
                          max="100"
                          step="1"
                          value={filters.priceRange[0]}
                          onChange={(e) => {
                            const minPrice = Number(e.target.value);
                            if (minPrice <= filters.priceRange[1]) {
                              handleFilterChange("priceRange", [
                                minPrice,
                                filters.priceRange[1],
                              ]);
                            }
                          }}
                          className="w-full h-1 bg-gray-700 rounded-lg appearance-none cursor-pointer"
                          aria-label={`Minimum price: ₹${filters.priceRange[0]}`}
                        />
                      </div>
                    </div>
                  </div>

                  {/* Size */}
                  <div className="mb-6">
                    <h3 className="text-lg font-semibold text-white mb-2">
                      Size
                    </h3>
                    {sizes.map((size) => (
                      <label key={size} className="flex items-center mb-2">
                        <input
                          type="checkbox"
                          className="form-checkbox text-blue-600 focus:ring-blue-500"
                          checked={filters.size.includes(size)}
                          onChange={(e) => {
                            const newSizes = e.target.checked
                              ? [...filters.size, size]
                              : filters.size.filter((s) => s !== size);
                            handleFilterChange("size", newSizes);
                          }}
                          aria-label={`Filter by size ${size}`}
                        />
                        <span className="ml-2 text-gray-300">{size}</span>
                      </label>
                    ))}
                  </div>

                  {/* Rating */}
                  <div>
                    <h3 className="text-lg font-semibold text-white mb-2">
                      Rating
                    </h3>
                    <select
                      value={filters.rating}
                      onChange={(e) =>
                        handleFilterChange("rating", Number(e.target.value))
                      }
                      className="w-full p-2 rounded bg-gray-700 text-white focus:ring-2 focus:ring-blue-500"
                      aria-label="Filter by minimum rating"
                    >
                      <option value={0}>All Ratings</option>
                      <option value={4}>4+ Stars</option>
                      <option value={3}>3+ Stars</option>
                      <option value={2}>2+ Stars</option>
                    </select>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>

          {/* Product Grid & Sort (Centered) */}
          <motion.div className="lg:w-3/4" variants={childVariants}>
            {/* Sort Options */}
            <motion.div
              className="flex flex-col sm:flex-row justify-center items-center gap-4 mb-6"
              variants={childVariants}
            >
              <h2 className="text-xl sm:text-2xl font-bold text-white">
                Products
              </h2>
              <motion.select
                value={sortOption}
                onChange={(e) => setSortOption(e.target.value)}
                className="p-2 sm:p-3 rounded bg-gray-800 text-white text-sm sm:text-base shadow-lg hover:shadow-xl transition-all duration-300 focus:ring-2 focus:ring-blue-500"
                aria-label="Sort products"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {sortOptions.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </motion.select>
            </motion.div>

            {/* Product Grid */}
            <motion.div
              className="max-w-5xl mx-auto"
              variants={containerVariants}
            >
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 justify-center">
                {filteredProducts.length === 0 ? (
                  <motion.p
                    className="text-gray-300 text-center col-span-full"
                    variants={childVariants}
                  >
                    No products match your filters.
                  </motion.p>
                ) : (
                  filteredProducts.map((product, index) => (
                    <motion.div
                      key={product.id}
                      variants={childVariants}
                      custom={index}
                    >
                      <Link
                        to={`/products/${product.id}`}
                        className="block bg-gray-800 rounded-lg overflow-hidden shadow-lg hover:shadow-2xl transform hover:scale-105 transition-all duration-300 max-w-sm mx-auto"
                        aria-label={`View details for ${product.name}`}
                      >
                        <motion.img
                          src={product.image}
                          alt={`Image of ${product.name}, a ${product.type} t-shirt`}
                          className="w-full h-48 sm:h-56 object-cover"
                          whileHover={{ scale: 1.1 }}
                          transition={{ duration: 0.3 }}
                        />
                        <div className="p-4 sm:p-6 pt-4 sm:pt-6">
                          <h3 className="text-lg sm:text-xl font-semibold text-white mb-2">
                            {product.name}
                          </h3>
                          <p className="text-gray-300 mb-2">
                            ₹{product.price.toFixed(2)}
                          </p>
                          <div className="flex items-center mb-4">
                            {[...Array(5)].map((_, i) => (
                              <svg
                                key={i}
                                className={`w-4 h-4 ${
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
                            <span className="ml-2 text-gray-300 text-sm">
                              {product.rating.toFixed(1)}
                            </span>
                          </div>
                          <motion.button
                            onClick={(e) => {
                              e.preventDefault(); // Prevent Link navigation
                              handleAddToCart(product);
                            }}
                            className="w-full px-4 py-2 text-sm sm:text-base bg-blue-600 hover:bg-blue-700 text-white rounded-full shadow-lg hover:shadow-xl transition-all duration-300"
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            aria-label={`Add ${product.name} to cart`}
                          >
                            Add to Cart
                          </motion.button>
                        </div>
                      </Link>
                    </motion.div>
                  ))
                )}
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </motion.section>
  );
};

export default ProductListingPage;
