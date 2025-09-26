// src/pages/CategoryPage.jsx
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { fetchProductsByCategory } from "../api";
import ProductCard from "../components/ProductCard";
import Tout from "../components/Tout";
import touts from "../data/touts.json";
import SortDropdown from "../components/SortDropdown";

export default function CategoryPage() {
  const { category } = useParams();   //grab route param
  const [products, setProducts] = useState([]);
  const [sortMode, setSortMode] = useState("title_asc");

  useEffect(() => {
    let mounted = true;
    if (category) {
      fetchProductsByCategory(category).then((data) => {
        if (mounted) setProducts(data || []);
      });
    }
    return () => (mounted = false);
  }, [category]);


  const sorted = [...products].sort((a, b) => {
  switch (sortMode) {
    case "title_asc": return a.title.localeCompare(b.title);
    case "title_desc": return b.title.localeCompare(a.title);
    case "rating_desc": return b.rating.rate - a.rating.rate;
    case "price_asc": return a.price - b.price;
    case "price_desc": return b.price - a.price;
    default: return 0;
    }
  });


  // interleave touts every 3 products
  const itemsWithTouts = [];
  let toutIndex = 0;
  for (let i = 0; i < sorted.length; i++) {
    itemsWithTouts.push({ type: "product", payload: sorted[i] });
    if ((i + 1) % 3 === 0) {
      const tout = touts[toutIndex % touts.length] || {};
      itemsWithTouts.push({ type: "tout", payload: tout });
      toutIndex++;
    }
  }
  return (
<div className="bg-white">
  <div className="mx-auto w-full px-4 py-16 sm:px-6 sm:py-24 lg:px-8 max-w-7xl">

    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-8 gap-4">
      <h1 className="text-2xl font-bold tracking-tight text-gray-900 capitalize">
        {category}
      </h1>
      <SortDropdown value={sortMode} onChange={setSortMode} />
    </div>

    <div className="mt-6 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:gap-x-8 mb-8">
      {itemsWithTouts.map((it, idx) =>
        it.type === "product" ? (
          <ProductCard key={`p-${it.payload.id}`} product={it.payload} />
        ) : (
          <Tout key={`t-${idx}`} tout={it.payload} />
        )
      )}
    </div>
  </div>
</div>

  );
};