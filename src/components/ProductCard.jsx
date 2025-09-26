import { useCart } from "../context/useCart";

export default function ProductCard({ product }) {
  const { addToCart } = useCart();

  return (
    <div className="group relative flex flex-col">
      {/* Image wrapper with fixed ratio */}
      <div className="aspect-square w-full overflow-hidden rounded-md bg-gray-100">
        <img
          src={product.image}
          alt={product.title}
          className="h-full w-full object-contain p-4 group-hover:opacity-75"
        />
      </div>

      {/* Content */}
      <div className="mt-4 flex justify-between">
        <div>
          <h3 className="text-sm font-medium text-gray-900 line-clamp-2">
            {product.title}
          </h3>
          <p className="mt-1 text-sm text-gray-500 capitalize">
            {product.category}
          </p>
        </div>
        <p className="text-sm font-semibold text-gray-900">
          ${product.price.toFixed(2)}
        </p>
      </div>

      <button
        onClick={() => addToCart(product)}
        className="mt-3 w-full rounded-md bg-black px-3 py-2 text-sm font-medium hover:bg-gray-800"
      >
        Add to Cart
      </button>
    </div>
  );
}
