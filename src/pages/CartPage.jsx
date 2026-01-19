// src/pages/CartPage.jsx
import React, { useState } from 'react';
import { useCart } from "../context/useCart";


export default function CartPage() {
  const { items, updateQuantity } = useCart();
  const [updatingId, setUpdatingId] = useState(null);

  const changeQty = async (id, delta) => {
    const item = items.find(i => i.id === id);
    if (!item) return;
    const newQty = item.quantity + delta;
    setUpdatingId(id);
    try {
      await updateQuantity(id, newQty);
    } catch (err) {
      console.error('failed update', err);
    } finally {
      setUpdatingId(null);
    }
  };

  const totalQuantity = items.reduce((sum, it) => sum + it.quantity, 0);
const subtotal = items.reduce(
  (sum, it) => sum + it.price * it.quantity,
  0
);


  return (
<div className="container mx-auto p-4">
  <h2 className="text-2xl font-semibold mb-6">Shopping Cart</h2>


{items.length > 0 && (
      <div className="flex flex-wrap items-center justify-between text-sm text-gray-600">
        <div>
          <span className="font-medium text-gray-900">
            {totalQuantity}
          </span>{" "}
          items
        </div>
        <div>
          Subtotal:{" "}
          <span className="font-semibold text-gray-900">
            ${subtotal.toFixed(2)}
          </span>
        </div>
      </div>
    )}
      {items.length === 0 ? (
        <p>Your cart is empty</p>
      ) : (
        <div className="space-y-4">
          {items.map(it => (
            <div key={it.id} className="flex items-center bg-white p-4 rounded-lg shadow gap-4">
              <img src={it.image} alt={it.title} className="w-20 h-20 object-contain" />
              <div className="flex-1">
                <div className="font-medium">{it.title}</div>
                <div className="text-sm">${it.price.toFixed(2)}</div>
              </div>

              <div className="flex items-center gap-2">
                <button
                  className="p-2 border rounded"
                  onClick={() => changeQty(it.id, -1)}
                  disabled={updatingId === it.id}
                >
                  -
                </button>
                <div className="min-w-[32px] text-center">{it.quantity}</div>
                <button
                  className="p-2 border rounded"
                  onClick={() => changeQty(it.id, +1)}
                  disabled={updatingId === it.id}
                >
                  +
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
