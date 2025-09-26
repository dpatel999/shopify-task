export async function fetchCategories() {
  const res = await fetch('https://fakestoreapi.com/products/categories');
  return res.json();
}

export async function fetchProductsByCategory(category) {
  const res = await fetch(`https://fakestoreapi.com/products/category/${encodeURIComponent(category)}`);
  return res.json();
}