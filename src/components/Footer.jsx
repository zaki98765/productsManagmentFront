
import React from "react";
import { Link } from "react-router-dom";

function Footer() {
  return (
    <footer className="bg-gray-900 text-white mt-16">

      <div className="max-w-7xl mx-auto px-6 md:px-16 lg:px-24 py-12">

        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">

          {/* Brand */}
          <div>
            <Link to="/" className="text-2xl font-bold">
              Product<span className="text-indigo-400">Hub</span>
            </Link>

            <p className="text-gray-400 mt-4 max-w-sm">
              A simple and efficient product inventory management system
              for managing your products, stock, and pricing.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">
              Quick Links
            </h3>

            <div className="flex flex-col gap-3">

              <Link
                to="/"
                className="text-gray-400 hover:text-white transition"
              >
                Home
              </Link>

              <Link
                to="/products"
                className="text-gray-400 hover:text-white transition"
              >
                Products
              </Link>

             

            </div>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-lg font-semibold mb-4">
              Inventory
            </h3>

            <p className="text-gray-400 mb-2">
              Manage your products easily.
            </p>

            <p className="text-gray-400">
              Add • Edit • View • Delete
            </p>
          </div>

        </div>

        {/* Bottom */}
        <div className="border-t border-gray-700 mt-10 pt-6 flex flex-col md:flex-row justify-between items-center gap-3">

          <p className="text-sm text-gray-500">
            © {new Date().getFullYear()} ProductHub. All rights reserved.
          </p>

          <p className="text-sm text-gray-500">
            Product Inventory Management
          </p>

        </div>

      </div>

    </footer>
  );
}

export default Footer;

