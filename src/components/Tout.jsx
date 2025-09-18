// src/components/Tout.jsx
import React from 'react';

export default function Tout({ tout }) {
  // handle missing fields gracefully:
  const title = tout.title?.trim() || "Featured";
  const subtitle = tout.subtitle?.trim() || "";
  const cta = tout.cta?.trim() || "Shop";
  const url = tout.url || '/';
  const image = tout.image || 'https://via.placeholder.com/600x450?text=Promo';

  return (
    <a href={url} className="relative block group rounded overflow-hidden shadow" style={{ minHeight: '0' }}>
      <div className="w-full h-48">
        <img src={image} alt={title} className="w-full h-full object-cover" loading="lazy" />
      </div>

      <div className="absolute inset-0 flex flex-col justify-end p-4 bg-gradient-to-t from-black/60 to-transparent">
        <div className="text-white">
          <h3 className="text-lg font-semibold">{title}</h3>
          {subtitle && <p className="text-sm opacity-90">{subtitle}</p>}
          <div className="mt-2">
            <span className="inline-block bg-white text-black text-sm px-3 py-1 rounded">{cta}</span>
          </div>
        </div>
      </div>
    </a>
  );
}
