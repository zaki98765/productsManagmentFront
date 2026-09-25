
import React, { useEffect, useState } from "react";
import Swal from "sweetalert2";
import api from "../Services/api";

function ProductEdit({ product, onClose, onUpdated }) {

  const [formData, setFormData] = useState({
    name: "",
    category: "",
    price: "",
    stock: "",
    description: "",
    image: ""
  });

  // Load product data into form
  useEffect(() => {
    if (product) {
      setFormData({
        name: product.name || "",
        category: product.category || "",
        price: product.price || "",
        stock: product.stock || "",
        description: product.description || "",
        image: product.image || ""
      });
    }
  }, [product]);

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData({
      ...formData,
      [name]: value
    });
  };

  // Update product
  const handleUpdate = async (e) => {
    e.preventDefault();

    try {

      const updatedProduct = {
        ...formData,
        price: Number(formData.price),
        stock: Number(formData.stock)
      };

      const response = await api.put(
        `/products/${product.id}`,
        updatedProduct
      );

      // Success alert
      Swal.fire({
        title: "Updated!",
        text: "Product has been updated successfully.",
        icon: "success",
        confirmButtonText: "OK"
      });

      // Send updated product to parent
      onUpdated(response.data);

      // Close modal
      onClose();

    } catch (error) {

      console.log(error);

      Swal.fire({
        title: "Error!",
        text: "Failed to update product.",
        icon: "error",
        confirmButtonText: "OK"
      });

    }
  };

  if (!product) {
    return null;
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-4">

      {/* Modal */}
      <div className="bg-white w-full max-w-2xl rounded-2xl shadow-xl max-h-[90vh] overflow-y-auto">

        {/* Header */}
        <div className="flex items-center justify-between px-6 py-5 border-b">

          <div>
            <h2 className="text-2xl font-bold text-gray-900">
              Edit Product
            </h2>

            <p className="text-sm text-gray-500 mt-1">
              Update product information
            </p>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="text-gray-400 hover:text-gray-700 text-2xl"
          >
            ×
          </button>

        </div>

        {/* Form */}
        <form
          onSubmit={handleUpdate}
          className="p-6 space-y-5"
        >

          {/* Name */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Product Name
            </label>

            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              className="w-full border border-gray-300 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-indigo-500"
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
              required
              className="w-full border border-gray-300 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          {/* Price & Stock */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">

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
                required
                min="0"
                className="w-full border border-gray-300 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-indigo-500"
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
                required
                min="0"
                className="w-full border border-gray-300 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>

          </div>

          {/* Image */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Image URL
            </label>

            <input
              type="url"
              name="image"
              value={formData.image}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          {/* Description */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Description
            </label>

            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              rows="4"
              required
              className="w-full border border-gray-300 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-indigo-500 resize-none"
            />
          </div>

          {/* Buttons */}
          <div className="flex justify-end gap-3 pt-4 border-t">

            <button
              type="button"
              onClick={onClose}
              className="px-5 py-2.5 border border-gray-300 rounded-xl text-gray-700 hover:bg-gray-50"
            >
              Cancel
            </button>

            <button
              type="submit"
              className="px-6 py-2.5 bg-indigo-500 hover:bg-indigo-600 text-white rounded-xl font-medium transition"
            >
              Update Product
            </button>

          </div>

        </form>

      </div>

    </div>
  );
}

export default ProductEdit;

