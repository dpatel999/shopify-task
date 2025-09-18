// src/pages/Home.jsx
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { fetchCategories } from "../api";

export default function Home() {
  const [categories, setCategories] = useState([]);

  console.log(categories);

  useEffect(() => {
    fetchCategories().then(setCategories);
  }, []);

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Shop by Category</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {categories.map((cat) => (
          <Link
            key={cat}
            to={`/category/${cat}`}
            className="p-6 bg-white rounded-lg shadow hover:shadow-lg transition"
          >
            <h2 className="text-xl capitalize font-medium">{cat}</h2>
          </Link>
        ))}
      </div>
    </div>
  );
}
