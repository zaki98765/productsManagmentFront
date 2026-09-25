
import React, { useState } from "react";
import { Link } from 'react-router-dom';

function Header() {
  const [open, setOpen] = useState(false);

  return (
    <nav className="flex items-center justify-between px-6 md:px-16 lg:px-24 xl:px-32 py-4 border-b border-gray-200 bg-white relative">

      {/* Logo */}
      <Link to="/" className="flex items-center gap-2">
        <div className="w-9 h-9 bg-indigo-500 rounded-lg flex items-center justify-center">
          <span className="text-white font-bold text-lg">P</span>
        </div>

        <span className="text-xl font-semibold text-gray-800">
          Product<span className="text-indigo-500">Hub</span>
        </span>
      </Link>

      {/* Desktop Menu */}
      <div className="hidden sm:flex items-center gap-8">

        <Link
          to="/"
          className="text-gray-700 hover:text-indigo-500 transition"
        >
          Home
        </Link>

        <Link
          to="/products"
          className="text-gray-700 hover:text-indigo-500 transition"
        >
          Products
        </Link>

        

      </div>

      {/* Mobile Menu Button */}
      <button
        onClick={() => setOpen(!open)}
        className="sm:hidden text-gray-700"
        aria-label="Menu"
      >
        ☰
      </button>

      {/* Mobile Menu */}
      <div
        className={`${
          open ? "flex" : "hidden"
        } absolute top-full left-0 w-full bg-white shadow-md py-4 flex-col gap-4 px-6 sm:hidden z-50`}
      >

        <Link
          to="/"
          className="text-gray-700"
          onClick={() => setOpen(false)}
        >
          Home
        </Link>

        <Link
          to="/products"
          className="text-gray-700"
          onClick={() => setOpen(false)}
        >
          Products
        </Link>

        <Link
          to="/add-product"
          className="text-gray-700"
          onClick={() => setOpen(false)}
        >
          Add Product
        </Link>

      </div>

    </nav>
  );
}

export default Header;
