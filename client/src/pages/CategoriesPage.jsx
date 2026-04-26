import { Link } from "react-router-dom";
import { products } from "../data/products";

const CategoriesPage = () => {
  const categories = [
    { label: "Oversized", slug: "oversized", type: "Oversized" },
    { label: "Crew Neck", slug: "crew-neck", type: "Crew Neck" },
    { label: "V-Neck", slug: "v-neck", type: "V-Neck" },
    { label: "Hoodies", slug: "hoodies", type: "Hoodie" },
    { label: "Sleeveless", slug: "sleeveless", type: "Sleeveless" },
  ];

  const countByType = products.reduce((acc, product) => {
    acc[product.type] = (acc[product.type] || 0) + 1;
    return acc;
  }, {});

  return (
    <section className="bg-gray-900 min-h-screen py-12 sm:py-16 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl sm:text-4xl font-bold mb-3">Shop Categories</h1>
        <p className="text-gray-300 mb-8">
          Browse products by fit and style.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {categories.map((category) => (
            <Link
              key={category.slug}
              to={`/products?category=${category.slug}`}
              className="bg-gray-800 border border-gray-700 rounded-xl p-6 hover:border-blue-500 hover:shadow-xl transition-all duration-300"
            >
              <p className="text-xl font-semibold mb-2">{category.label}</p>
              <p className="text-sm text-gray-300">
                {countByType[category.type] || 0} products
              </p>
              <p className="text-blue-400 text-sm mt-4">View Products</p>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CategoriesPage;

