
import React, { useEffect, useState } from "react";
import api from "../Services/api";
import { Link } from "react-router-dom";

function Prd() {
  const [products, setProducts] = useState([]);

  const fetchProducts = async () => {
    try {
      const response = await api.get("/products");

      setProducts(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 p-6">

      {/* Page Heading */}
      <h1 className="text-3xl font-bold text-gray-900">
        Products
      </h1>

      <p className="text-gray-500 mt-2">
        Manage your inventory products
      </p>

      {/* Products */}
      <div className="mt-8">

        {products.length === 0 ? (

          <p className="text-gray-500">
            No products available.
          </p>

        ) : (

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">

            {products.map((product) => (
              <Link
                to={`/products/${product.id}`}
                key={product.id}
                className="block"
              >
                <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden shadow-sm hover:shadow-lg transition duration-300">

                  {/* Product Image */}
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-52 object-cover"
                  />

                  {/* Product Details */}
                  <div className="p-5">

                    {/* Category */}
                    <p className="text-sm text-indigo-500 font-medium mb-2">
                      {product.category}
                    </p>

                    {/* Product Name */}
                    <h2 className="text-xl font-semibold text-gray-900">
                      {product.name}
                    </h2>

                    {/* Price & Stock */}
                    <div className="flex items-center justify-between mt-5">

                      {/* Price */}
                      <div>
                        <p className="text-xs text-gray-400">
                          Price
                        </p>

                        <p className="text-lg font-bold text-gray-900">
                          ₹{product.price.toLocaleString("en-IN")}
                        </p>
                      </div>

                      {/* Stock */}
                      <div className="text-right">
                        <p className="text-xs text-gray-400">
                          Stock
                        </p>

                        <p
                          className={`font-semibold ${product.stock > 5
                              ? "text-green-600"
                              : "text-red-500"
                            }`}
                        >
                          {product.stock}
                        </p>
                      </div>

                    </div>

                  </div>

                </div>
              </Link>
            ))}

          </div>

        )}

      </div>

    </div>
  );
}

export default Prd;

