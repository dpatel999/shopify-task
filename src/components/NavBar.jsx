// src/components/NavBar.jsx
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useCart } from "../context/useCart";
import { fetchCategories } from "../api";

export default function NavBar() {
  const { items } = useCart();
  const totalQty = items.reduce((sum, i) => sum + (i.quantity || 0), 0);

  const [categories, setCategories] = useState([]);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [catOpen, setCatOpen] = useState(false);

  useEffect(() => {
    fetchCategories()
      .then(setCategories)
      .catch(() => setCategories([])); 
  }, []);

  return (
    <header className="bg-white shadow-sm z-40">
      {/* center wrapper */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 ">
        <div className="flex items-center justify-between h-16">
          {/* LEFT: Logo + desktop nav */}
          <div className="flex items-center px-4 sm:px-6 lg:px-8">
            <Link to="/" className="text-2xl font-bold">
              Darsh's Shop
            </Link>

            <nav className="hidden md:flex items-center space-x-6">

              <div
                className="relative"
                onMouseEnter={() => setCatOpen(true)}
                onMouseLeave={() => setCatOpen(false)}
              >

                {catOpen && (
                  <div
                    className="absolute left-0 mt-2 w-48 bg-white border rounded-md shadow-lg overflow-hidden"
                    role="menu"
                    onMouseEnter={() => setCatOpen(true)}
                    onMouseLeave={() => setCatOpen(false)}
                  >
                    {categories.map((cat) => (
                      <Link
                        key={cat}
                        to={`/category/${encodeURIComponent(cat)}`}
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 capitalize"
                      >
                        {cat}
                      </Link>
                    ))}
                    {categories.length === 0 && (
                      <div className="px-4 py-2 text-sm text-gray-500">No categories</div>
                    )}
                  </div>
                )}
              </div>
            </nav>
          </div>

          <div className="flex items-center">
            <Link
              to="/cart"
              className="relative mr-4 text-sm text-gray-700 hover:text-gray-900"
            >
              Cart
              {totalQty > 0 && (
                <span className="ml-2 inline-flex items-center justify-center px-2 py-0.5 text-xs font-medium rounded-full bg-red-600 text-white">
                  {totalQty}
                </span>
              )}
            </Link>

            {/* mobile hamburger */}
            <button
              className="md:hidden p-2 rounded-md focus:outline-none"
              onClick={() => setMobileOpen((s) => !s)}
              aria-expanded={mobileOpen}
            >
              <span className="sr-only">Open menu</span>
              {mobileOpen ? "✖" : "☰"}
            </button>
          </div>
        </div>
      </div>

      {mobileOpen && (
        <div className="md:hidden bg-white border-t">
          <div className="px-4 py-3 space-y-2">
            <Link to="/" className="block text-sm text-gray-700" onClick={() => setMobileOpen(false)}>
              Home
            </Link>

            
              <div className="ml-2 space-y-1">
                {categories.map((c) => (
                  <Link
                    key={c}
                    to={`/category/${encodeURIComponent(c)}`}
                    className="block text-sm text-gray-700 capitalize"
                    onClick={() => setMobileOpen(false)}
                  >
                    {c}
                  </Link>
                ))}
                {categories.length === 0 && <div className="text-sm text-gray-500">No categories</div>}
              </div>

            <Link to="/cart" className="block text-sm text-gray-700" onClick={() => setMobileOpen(false)}>
              Cart
            </Link>
          </div>
        </div>
      )}
    </header>

    
  );
}
