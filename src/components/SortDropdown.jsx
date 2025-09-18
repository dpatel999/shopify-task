// src/components/SortDropdown.jsx
export default function SortDropdown({ value, onChange }) {
  return (
    <select
      className="border rounded p-2"
      value={value}
      onChange={e => onChange(e.target.value)}
    >
      <option value="title_asc">Title: A → Z</option>
      <option value="title_desc">Title: Z → A</option>
      <option value="rating_desc">Rating: High → Low</option>
      <option value="price_asc">Price: low → high</option>
      <option value="price_desc">Price: high → low</option>
    </select>
  );
}
