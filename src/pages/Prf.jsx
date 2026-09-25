
import React from "react";
import { Link } from "react-router-dom";

function Prf() {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-6">

      <div className="text-center max-w-lg">

        {/* 404 */}
        <h1 className="text-8xl md:text-9xl font-bold text-indigo-500">
          404
        </h1>

        {/* Title */}
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mt-4">
          Page Not Found
        </h2>

        {/* Description */}
        <p className="text-gray-500 mt-4 leading-relaxed">
          Sorry, the page you're looking for doesn't exist or may have
          been moved to another location.
        </p>

        {/* Buttons */}
        <div className="flex flex-col sm:flex-row justify-center gap-3 mt-8">

          <Link
            to="/"
            className="px-6 py-3 bg-indigo-500 hover:bg-indigo-600 text-white rounded-xl font-medium transition"
          >
            Go Home
          </Link>

          <Link
            to="/products"
            className="px-6 py-3 border border-gray-300 hover:border-indigo-500 hover:text-indigo-500 text-gray-700 rounded-xl font-medium transition"
          >
            View Products
          </Link>

        </div>

      </div>

    </div>
  );
}

export default Prf;

