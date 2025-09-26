// src/components/Tout.jsx
export default function Tout({ tout }) {
  return (
    <a href={tout.url || "#"} className="group relative flex flex-col">
      <div className="aspect-square w-full overflow-hidden rounded-md bg-gray-100">
        <img
          src={tout.image || "https://via.placeholder.com/400x400"}
          alt={tout.title || "Promotion"}
          className="h-full w-full object-cover group-hover:opacity-75"
        />
      </div>

      <div className="mt-4">
        <h3 className="text-sm font-semibold text-gray-900">
          {tout.title || "Featured"}
        </h3>
        {tout.subtitle && (
          <p className="mt-1 text-sm text-gray-500">{tout.subtitle}</p>
        )}
      </div>
    </a>
  );
}