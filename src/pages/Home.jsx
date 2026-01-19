import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { fetchCategories } from "../api";

export default function Home() {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    fetchCategories().then(setCategories);
  }, []);

  return (
    <main className="w-full bg-gray-50 min-h-screen">
      <section className="w-full bg-gradient-to-b from-white to-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 flex flex-col items-center text-center">
          <h1 className="text-4xl sm:text-5xl font-extrabold text-gray-900 mb-4">
            Shop By Categories
          </h1>

          <div className="mt-10 w-full">
            <div className="grid grid-cols-1 gap-4">
              {categories.map((cat) => (
                <Link
                  key={cat}
                  to={`/category/${encodeURIComponent(cat)}`}
                  className="bg-white rounded-lg sm:px-4 lg:px-6 py-20  text-center shadow-sm hover:shadow-md capitalize"
                >
                  {cat}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}