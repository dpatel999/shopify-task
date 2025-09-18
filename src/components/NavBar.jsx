// src/components/NavBar.jsx
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useCart } from "../context/useCart";
import { fetchCategories } from "../api";

export default function NavBar() {
  const { items } = useCart();
  const totalQty = items.reduce((sum, i) => sum + i.quantity, 0);

  const [categories, setCategories] = useState([]);
  const [menuOpen, setMenuOpen] = useState(false);
  const [catOpen, setCatOpen] = useState(false);

  useEffect(() => {
    fetchCategories().then(setCategories);
  }, []);

  return (
    <nav className="bg-black text-white">
      <div className="container mx-auto px-4 py-3 flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="font-bold text-xl">
          MyShop
        </Link>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center space-x-6 relative">
          <Link to="/" className="hover:text-gray-300">
            Home
          </Link>

          {/* Categories Dropdown */}
          <div
            className="relative"
            onMouseEnter={() => setCatOpen(true)}
            onMouseLeave={() => setCatOpen(false)}
          >
            <button className="hover:text-gray-300">Categories ▾</button>
            {catOpen && (
              <div className="absolute left-0 mt-2 bg-white text-black rounded shadow-lg w-48 z-50">
                {categories.map(cat => (
                  <Link
                    key={cat}
                    to={`/category/${cat}`}
                    className="block px-4 py-2 hover:bg-gray-200 capitalize"
                  >
                    {cat}
                  </Link>
                ))}
              </div>
            )}
          </div>

          {/* Cart with badge */}
          <Link to="/cart" className="relative hover:text-gray-300">
            Cart
            {totalQty > 0 && (
              <span className="absolute -top-2 -right-3 bg-red-600 text-xs px-2 py-0.5 rounded-full">
                {totalQty}
              </span>
            )}
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden focus:outline-none"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          {menuOpen ? "✖" : "☰"}
        </button>
      </div>

      {/* Mobile Menu Dropdown */}
      {menuOpen && (
        <div className="md:hidden bg-gray-800 px-4 py-2 space-y-2">
          <Link
            to="/"
            className="block hover:text-gray-300"
            onClick={() => setMenuOpen(false)}
          >
            Home
          </Link>

          {/* Mobile categories */}
          <details>
            <summary className="cursor-pointer hover:text-gray-300">
              Categories
            </summary>
            <div className="ml-4 space-y-1">
              {categories.map(cat => (
                <Link
                  key={cat}
                  to={`/category/${cat}`}
                  className="block hover:text-gray-300 capitalize"
                  onClick={() => setMenuOpen(false)}
                >
                  {cat}
                </Link>
              ))}
            </div>
          </details>

          <Link
            to="/cart"
            className="block relative hover:text-gray-300"
            onClick={() => setMenuOpen(false)}
          >
            Cart
            {totalQty > 0 && (
              <span className="absolute left-12 top-0 bg-red-600 text-xs px-2 py-0.5 rounded-full">
                {totalQty}
              </span>
            )}
          </Link>
        </div>
      )}
    </nav>
  );
}
