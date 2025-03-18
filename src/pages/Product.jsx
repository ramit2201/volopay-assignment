import CategoryFilter from "../components/product/CategoryFilter";
import ProductTable from "../components/product/ProductTable";

const Product = () => {
  return (
    <div className="p-4 bg-black min-h-screen">
      <CategoryFilter />
      <ProductTable />
    </div>
  );
};

export default Product;
