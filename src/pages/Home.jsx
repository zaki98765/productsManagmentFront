
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../Services/api";

function Home() {

  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch products from JSON Server
  const fetchProducts = async () => {

    try {

      const response = await api.get("/products");

      setProducts(response.data);

    } catch (error) {

      console.log("Error fetching products:", error);

    } finally {

      setLoading(false);

    }

  };


  // Fetch products when page loads
  useEffect(() => {

    fetchProducts();

  }, []);


  // ================= STATISTICS =================

  // Total products
  const totalProducts = products.length;


  // Total stock
  const totalStock = products.reduce(
    (total, product) => total + Number(product.stock || 0),
    0
  );


  // Total categories
  const totalCategories = new Set(
    products.map((product) => product.category)
  ).size;


  // Low stock products
  const lowStock = products.filter(
    (product) => Number(product.stock || 0) <= 5
  ).length;


  // Total inventory value
  const totalInventoryValue = products.reduce(
    (total, product) =>
      total +
      Number(product.price || 0) * Number(product.stock || 0),
    0
  );


  return (

    <div className="min-h-screen bg-gray-50">


      {/* ================= HERO SECTION ================= */}

      <section className="bg-white border-b border-gray-200">

        <div className="max-w-7xl mx-auto px-6 md:px-16 lg:px-24 py-16">

          <div className="flex flex-col md:flex-row items-center justify-between gap-10">


            {/* Hero Content */}

            <div className="max-w-2xl">

              <p className="text-indigo-500 font-semibold mb-3">
                INVENTORY MANAGEMENT
              </p>


              <h1 className="text-4xl md:text-5xl font-bold text-gray-900 leading-tight">

                Manage your

                <span className="text-indigo-500">
                  {" "}products{" "}
                </span>

                with ease.

              </h1>


              <p className="text-gray-500 mt-5 text-lg">

                Keep track of your products, prices and stock levels
                from one simple inventory management system.

              </p>


              {/* Buttons */}

              <div className="flex flex-wrap gap-4 mt-8">

                <Link
                  to="/products"
                  className="px-6 py-3 bg-indigo-500 hover:bg-indigo-600 text-white rounded-xl font-medium transition"
                >
                  View Products
                </Link>


                <Link
                  to="/AddP"
                  className="px-6 py-3 border border-gray-300 hover:border-indigo-500 hover:text-indigo-500 text-gray-700 rounded-xl font-medium transition"
                >
                  + Add Product
                </Link>

              </div>

            </div>


            {/* Hero Card */}

            <div className="hidden md:block">

              <div className="w-72 h-64 bg-indigo-50 rounded-3xl flex items-center justify-center">

                <div className="text-center">

                  <div className="w-20 h-20 mx-auto bg-indigo-500 rounded-2xl flex items-center justify-center">

                    <span className="text-white text-4xl">
                      📦
                    </span>

                  </div>


                  <h3 className="text-xl font-bold text-gray-800 mt-5">
                    ProductHub
                  </h3>


                  <p className="text-gray-500 text-sm mt-1">
                    Your inventory, simplified.
                  </p>

                </div>

              </div>

            </div>

          </div>

        </div>

      </section>


      {/* ================= STATISTICS ================= */}

      <section className="max-w-7xl mx-auto px-6 md:px-16 lg:px-24 py-10">

        {loading ? (

          <div className="text-center py-10">

            <p className="text-gray-500">
              Loading inventory...
            </p>

          </div>

        ) : (

          <>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">


              {/* Total Products */}

              <div className="bg-white border border-gray-200 rounded-2xl p-6">

                <p className="text-gray-500 text-sm">
                  Total Products
                </p>

                <h2 className="text-3xl font-bold text-gray-900 mt-2">
                  {totalProducts}
                </h2>

                <p className="text-green-500 text-sm mt-2">
                  Products in inventory
                </p>

              </div>


              {/* Total Stock */}

              <div className="bg-white border border-gray-200 rounded-2xl p-6">

                <p className="text-gray-500 text-sm">
                  Total Stock
                </p>

                <h2 className="text-3xl font-bold text-gray-900 mt-2">
                  {totalStock}
                </h2>

                <p className="text-green-500 text-sm mt-2">
                  Items available
                </p>

              </div>


              {/* Categories */}

              <div className="bg-white border border-gray-200 rounded-2xl p-6">

                <p className="text-gray-500 text-sm">
                  Categories
                </p>

                <h2 className="text-3xl font-bold text-gray-900 mt-2">
                  {totalCategories}
                </h2>

                <p className="text-indigo-500 text-sm mt-2">
                  Product categories
                </p>

              </div>


              {/* Low Stock */}

              <div className="bg-white border border-gray-200 rounded-2xl p-6">

                <p className="text-gray-500 text-sm">
                  Low Stock
                </p>

                <h2 className="text-3xl font-bold text-gray-900 mt-2">
                  {lowStock}
                </h2>

                <p className="text-orange-500 text-sm mt-2">
                  Need attention
                </p>

              </div>

            </div>


            {/* ================= INVENTORY VALUE ================= */}

            <div className="mt-5">

              <div className="bg-white border border-gray-200 rounded-2xl p-6">

                <p className="text-gray-500 text-sm">
                  Total Inventory Value
                </p>

                <h2 className="text-3xl font-bold text-gray-900 mt-2">

                  ₹{totalInventoryValue.toLocaleString("en-IN")}

                </h2>

                <p className="text-indigo-500 text-sm mt-2">
                  Price × available stock
                </p>

              </div>

            </div>


            {/* ================= RECENT PRODUCTS ================= */}

            <div className="mt-10">

              <div className="flex items-center justify-between mb-5">

                <div>

                  <h2 className="text-2xl font-bold text-gray-900">
                    Products
                  </h2>

                  <p className="text-gray-500 text-sm mt-1">
                    Products currently in your inventory
                  </p>

                </div>


                <Link
                  to="/products"
                  className="text-indigo-500 hover:text-indigo-600 font-medium"
                >
                  View All →
                </Link>

              </div>


              {/* Product Cards */}

              {products.length === 0 ? (

                <div className="bg-white border border-gray-200 rounded-2xl p-10 text-center">

                  <p className="text-gray-500">
                    No products available.
                  </p>

                  <Link
                    to="/add-product"
                    className="inline-block mt-4 px-5 py-2 bg-indigo-500 text-white rounded-lg"
                  >
                    Add Product
                  </Link>

                </div>

              ) : (

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">

                  {products.slice(0, 4).map((product) => (

                    <Link
                      key={product.id}
                      to={`/products/${product.id}`}
                      className="bg-white rounded-2xl border border-gray-200 overflow-hidden shadow-sm hover:shadow-lg transition duration-300"
                    >

                      {/* Image */}

                      <img
                        src={product.image}
                        alt={product.name}
                        className="w-full h-44 object-cover"
                      />


                      {/* Details */}

                      <div className="p-5">

                        <p className="text-sm text-indigo-500 font-medium">
                          {product.category}
                        </p>


                        <h3 className="text-lg font-semibold text-gray-900 mt-1">
                          {product.name}
                        </h3>


                        <div className="flex justify-between items-center mt-4">

                          <p className="font-bold text-gray-900">

                            ₹{Number(product.price).toLocaleString("en-IN")}

                          </p>


                          <p
                            className={`text-sm font-semibold ${
                              Number(product.stock) > 5
                                ? "text-green-600"
                                : "text-red-500"
                            }`}
                          >
                            Stock: {product.stock}
                          </p>

                        </div>

                      </div>

                    </Link>

                  ))}

                </div>

              )}

            </div>

          </>

        )}

      </section>

    </div>

  );

}

export default Home;

