// src/components/ProductCard.jsx
import React from 'react';
import { useCart } from "../context/useCart";


export default function ProductCard({ product }) {
  const { addToCart } = useCart();

  return (
    <div className="bg-white shadow rounded overflow-hidden">
      <div className="w-full card-image">
        {/* use CSS aspect-ratio or set a fixed height with object-cover */}
        <img
          src={product.image}
          alt={product.title}
          className="w-full h-48 object-cover"
          loading="lazy"
        />
      </div>

      <div className="p-3">
        <h3 className="text-sm font-medium line-clamp-2">{product.title}</h3>
        <p className="mt-2 font-semibold">${product.price.toFixed(2)}</p>

        <button
          className="mt-3 w-full py-2 px-3 bg-black text-white rounded"
          onClick={() => {
            console.log("👉 Add to cart clicked for:", product);
            addToCart(product);
          }}
        >
          Add to cart
        </button>
      </div>
    </div>
  );
}
