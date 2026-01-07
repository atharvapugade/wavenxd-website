// app/products/page.js
import ProductsGrid from "../components/ProductsGrid";

export default async function ProductsPage() {
  return (
    <main className="products-page py-12">
      <h1 className="text-3xl font-bold text-center mb-10">Our Products</h1>
      <ProductsGrid />
    </main>
  );
}
