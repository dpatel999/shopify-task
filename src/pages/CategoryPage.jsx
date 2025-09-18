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
  const [sortMode, setSortMode] = useState("price_asc");

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
    <div className="container mx-auto p-4">
      <div className="flex items-center justify-between mb-4">
        <h1 className="text-2xl font-semibold capitalize">{category}</h1>
        <SortDropdown value={sortMode} onChange={setSortMode} />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {itemsWithTouts.map((it, idx) =>
          it.type === "product" ? (
            <ProductCard key={`p-${it.payload.id}`} product={it.payload} />
          ) : (
            <Tout key={`t-${idx}`} tout={it.payload} />
          )
        )}
      </div>
    </div>
  );
}
