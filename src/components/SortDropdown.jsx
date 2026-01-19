// src/components/SortDropdown.jsx
export default function SortDropdown({ value, onChange }) {
  return (
    <select
      value={value}
      onChange={e => onChange(e.target.value)}
      className="
        bg-white
        text-gray-900
        border border-gray-300
        rounded-md
        px-3 py-2
        text-sm
        focus:outline-none
        focus:ring-2
        focus:ring-indigo-500
        focus:border-indigo-500
        cursor-pointer
      "
    >
      <option value="title_asc">Title: A → Z</option>
      <option value="title_desc">Title: Z → A</option>
      <option value="rating_desc">Rating: High → Low</option>
      <option value="price_asc">Price: low → high</option>
      <option value="price_desc">Price: high → low</option>
    </select>
  );
}
