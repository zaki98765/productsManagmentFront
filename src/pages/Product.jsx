
import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import Swal from "sweetalert2";
import api from "../Services/api";
import ProductEdit from "../components/ProductEdit";

function Product() {
  const { id } = useParams();

  const navigate = useNavigate();

  const [product, setProduct] = useState(null);
  const [showEdit, setShowEdit] = useState(false);

  // ================= FETCH PRODUCT =================

  const fetchProduct = async () => {
    try {
      const response = await api.get(`/products/${id}`);

      setProduct(response.data);

    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchProduct();
  }, [id]);


  // ================= DELETE PRODUCT =================

  const handleDelete = async () => {

    // Confirmation Alert
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to recover this product!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#ef4444",
      cancelButtonColor: "#6b7280",
      confirmButtonText: "Yes, delete it!",
      cancelButtonText: "Cancel"
    });

    // If user clicks Cancel
    if (!result.isConfirmed) {
      return;
    }

    try {

      // Delete from JSON Server
      await api.delete(`/products/${id}`);

      // Success Alert
      await Swal.fire({
        title: "Deleted!",
        text: "Product has been deleted successfully.",
        icon: "success",
        confirmButtonText: "OK"
      });

      // Navigate back to products page
      navigate("/products");

    } catch (error) {

      console.log(error);

      // Error Alert
      Swal.fire({
        title: "Error!",
        text: "Failed to delete the product.",
        icon: "error",
        confirmButtonText: "OK"
      });

    }
  };


  // ================= LOADING =================

  if (!product) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">

        <p className="text-gray-500">
          Loading product...
        </p>

      </div>
    );
  }


  // ================= UI =================

  return (
    <div className="min-h-screen bg-gray-50 px-6 py-10">

      <div className="max-w-5xl mx-auto">

        {/* Back Button */}
        <Link
          to="/products"
          className="inline-block text-indigo-500 hover:text-indigo-600 mb-6"
        >
          ← Back to Products
        </Link>


        {/* Product Container */}
        <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden">

          <div className="grid grid-cols-1 md:grid-cols-2">


            {/* ================= IMAGE ================= */}

            <div className="bg-gray-100 flex items-center justify-center">

              <img
                src={product.image}
                alt={product.name}
                className="w-full h-full max-h-[500px] object-cover"
              />

            </div>


            {/* ================= DETAILS ================= */}

            <div className="p-8 md:p-10">


              {/* Category */}

              <p className="text-indigo-500 font-medium mb-3">
                {product.category}
              </p>


              {/* Name */}

              <h1 className="text-3xl md:text-4xl font-bold text-gray-900">
                {product.name}
              </h1>


              {/* Price */}

              <div className="mt-6">

                <p className="text-sm text-gray-400">
                  Price
                </p>

                <p className="text-3xl font-bold text-gray-900">
                  ₹{Number(product.price).toLocaleString("en-IN")}
                </p>

              </div>


              {/* Stock */}

              <div className="mt-6">

                <p className="text-sm text-gray-400">
                  Available Stock
                </p>

                <span
                  className={`inline-block mt-2 px-3 py-1 rounded-full text-sm font-medium ${
                    product.stock > 5
                      ? "bg-green-50 text-green-600"
                      : "bg-red-50 text-red-500"
                  }`}
                >
                  {product.stock} items available
                </span>

              </div>


              {/* Description */}

              <div className="mt-6">

                <h2 className="text-lg font-semibold text-gray-900">
                  Description
                </h2>

                <p className="text-gray-500 mt-2 leading-relaxed">
                  {product.description}
                </p>

              </div>


              {/* ================= ACTION BUTTONS ================= */}

              <div className="flex gap-3 mt-8">

                {/* Edit Button */}

                <button
                  onClick={() => setShowEdit(true)}
                  className="flex-1 py-3 bg-indigo-500 hover:bg-indigo-600 text-white rounded-xl font-medium transition"
                >
                  Edit Product
                </button>


                {/* Delete Button */}

                <button
                  onClick={handleDelete}
                  className="flex-1 py-3 bg-red-500 hover:bg-red-600 text-white rounded-xl font-medium transition"
                >
                  Delete Product
                </button>

              </div>

            </div>

          </div>

        </div>


        {/* ================= EDIT MODAL ================= */}

        {showEdit && (
          <ProductEdit
            product={product}

            onClose={() => setShowEdit(false)}

            onUpdated={(updatedProduct) => {
              setProduct(updatedProduct);
            }}
          />
        )}

      </div>

    </div>
  );
}

export default Product;

