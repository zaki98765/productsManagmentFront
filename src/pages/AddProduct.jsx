
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import api from "../Services/api";

function AddProduct() {

  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    category: "",
    price: "",
    stock: "",
    description: "",
    image: ""
  });

  const [loading, setLoading] = useState(false);


  // Handle input changes
  const handleChange = (e) => {

    const { name, value } = e.target;

    setFormData({
      ...formData,
      [name]: value
    });

  };


  // Add product
  const handleSubmit = async (e) => {

    e.preventDefault();

    setLoading(true);

    try {

      const newProduct = {
        ...formData,
        price: Number(formData.price),
        stock: Number(formData.stock)
      };

      // POST request
      await api.post("/products", newProduct);

      // Success alert
      await Swal.fire({
        title: "Product Added!",
        text: "The product has been added successfully.",
        icon: "success",
        confirmButtonText: "View Products"
      });

      // Clear form
      setFormData({
        name: "",
        category: "",
        price: "",
        stock: "",
        description: "",
        image: ""
      });

      // Navigate to products
      navigate("/products");

    } catch (error) {

      console.log(error);

      Swal.fire({
        title: "Error!",
        text: "Failed to add the product.",
        icon: "error",
        confirmButtonText: "Try Again"
      });

    } finally {

      setLoading(false);

    }

  };


  return (

    <div className="min-h-screen bg-gray-50 px-6 py-10">

      <div className="max-w-3xl mx-auto">

        {/* Page Header */}

        <div className="mb-8">

          <h1 className="text-3xl font-bold text-gray-900">
            Add Product
          </h1>

          <p className="text-gray-500 mt-2">
            Add a new product to your inventory
          </p>

        </div>


        {/* Form Card */}

        <div className="bg-white rounded-2xl border border-gray-200 shadow-sm">

          <form
            onSubmit={handleSubmit}
            className="p-6 md:p-8 space-y-6"
          >


            {/* Product Name */}

            <div>

              <label className="block text-sm font-medium text-gray-700 mb-2">
                Product Name
              </label>

              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Enter product name"
                required
                className="w-full border border-gray-300 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
              />

            </div>


            {/* Category */}

            <div>

              <label className="block text-sm font-medium text-gray-700 mb-2">
                Category
              </label>

              <input
                type="text"
                name="category"
                value={formData.category}
                onChange={handleChange}
                placeholder="Enter product category"
                required
                className="w-full border border-gray-300 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
              />

            </div>


            {/* Price & Stock */}

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">


              {/* Price */}

              <div>

                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Price
                </label>

                <input
                  type="number"
                  name="price"
                  value={formData.price}
                  onChange={handleChange}
                  placeholder="Enter price"
                  min="0"
                  required
                  className="w-full border border-gray-300 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                />

              </div>


              {/* Stock */}

              <div>

                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Stock
                </label>

                <input
                  type="number"
                  name="stock"
                  value={formData.stock}
                  onChange={handleChange}
                  placeholder="Enter stock quantity"
                  min="0"
                  required
                  className="w-full border border-gray-300 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                />

              </div>

            </div>


            {/* Image URL */}

            <div>

              <label className="block text-sm font-medium text-gray-700 mb-2">
                Image URL
              </label>

              <input
                type="url"
                name="image"
                value={formData.image}
                onChange={handleChange}
                placeholder="https://example.com/image.jpg"
                required
                className="w-full border border-gray-300 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
              />

            </div>


            {/* Image Preview */}

            {formData.image && (

              <div>

                <p className="text-sm font-medium text-gray-700 mb-2">
                  Image Preview
                </p>

                <img
                  src={formData.image}
                  alt="Preview"
                  className="w-full h-56 object-cover rounded-xl border border-gray-200"
                  onError={(e) => {
                    e.currentTarget.style.display = "none";
                  }}
                />

              </div>

            )}


            {/* Description */}

            <div>

              <label className="block text-sm font-medium text-gray-700 mb-2">
                Description
              </label>

              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                placeholder="Enter product description"
                rows="5"
                required
                className="w-full border border-gray-300 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 resize-none"
              />

            </div>


            {/* Buttons */}

            <div className="flex flex-col-reverse sm:flex-row justify-end gap-3 pt-4 border-t border-gray-200">


              {/* Cancel */}

              <button
                type="button"
                onClick={() => navigate("/products")}
                className="px-6 py-3 border border-gray-300 text-gray-700 rounded-xl hover:bg-gray-50 transition"
              >
                Cancel
              </button>


              {/* Add */}

              <button
                type="submit"
                disabled={loading}
                className="px-6 py-3 bg-indigo-500 hover:bg-indigo-600 disabled:bg-indigo-300 text-white rounded-xl font-medium transition"
              >
                {loading ? "Adding Product..." : "Add Product"}
              </button>

            </div>

          </form>

        </div>

      </div>

    </div>

  );
}

export default AddProduct;

