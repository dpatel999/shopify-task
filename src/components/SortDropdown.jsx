// src/components/SortDropdown.jsx
export default function SortDropdown({ value, onChange }) {
  return (
    <select
      className="border rounded p-2"
      value={value}
      onChange={e => onChange(e.target.value)}
    >
      <option value="price_asc">Price: low → high</option>
      <option value="price_desc">Price: high → low</option>
    </select>
  );
}
