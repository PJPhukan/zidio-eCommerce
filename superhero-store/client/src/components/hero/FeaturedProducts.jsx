// src/components/FeaturedProducts.jsx
import React from "react";

const FeaturedProducts = () => {
  const products = [
    {
      id: 1,
      name: "Marvel Avengers T-Shirt",
      price: 499,
      image: "/assets/images/marvelT-shirt.jpg",
    },
    {
      id: 2,
      name: "Starry Night Hoodie",
      price: 1299,
      image: "/assets/images/sNightHoodie.jpg",
    },
    {
      id: 3,
      name: "DC Batman V-Neck",
      price: 599,
      image: "/assets/images/batmanV-neck.jpeg",
    },
    {
      id: 4,
      name: "Spider-Man Crew Neck",
      price: 899,
      image: "/assets/images/spidermanCrewNeck.avif",
    },
  ];

  return (
    <section className="bg-gray-900 py-12 sm:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-2xl sm:text-3xl font-bold text-white mb-8 text-center transform hover:scale-105 transition-all duration-300">
          Best Sellers
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
          {products.map((product) => (
            <div
              key={product.id}
              className="bg-gray-800 rounded-lg overflow-hidden shadow-lg hover:shadow-2xl transform hover:scale-105 transition-all duration-300"
            >
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-48 sm:h-56 object-cover transform hover:scale-110 transition-all duration-300"
              />
              <div className="p-4 sm:p-6">
                <h3 className="text-lg sm:text-xl font-semibold text-white mb-2">
                  {product.name}
                </h3>
                <p className="text-gray-300 mb-4">
                  ₹{product.price.toFixed(2)}
                </p>
                <button className="w-full px-4 py-2 text-sm sm:text-base bg-blue-600 hover:bg-blue-700 text-white rounded-full shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300">
                  Add to Cart
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturedProducts;
