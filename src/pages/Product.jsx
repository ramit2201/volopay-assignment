import { useEffect, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchProducts,
  fetchCategories,
  setCategories,
} from "../redux/reducers/product";
import {
  selectProducts,
  selectCategories,
  selectSelectedCategory,
  selectHasMore,
  selectLoading,
} from "../redux/selectors/product";
import TableDisplay from "../components/core/Table";
import Loader from "../components/core/Loader";

const headers = ["Product Name", "Category", "Price", "Rating", "Stock"];

const Product = () => {
  const dispatch = useDispatch();
  const products = useSelector(selectProducts);
  const categories = useSelector(selectCategories);
  const currentCategory = useSelector(selectSelectedCategory);
  const hasMore = useSelector(selectHasMore);
  const loading = useSelector(selectLoading);

  useEffect(() => {
    dispatch(fetchCategories());
    dispatch(fetchProducts(null, 10, 0)); // Fetch all products on load
  }, [dispatch]);

  const handleCategoryClick = (category) => {
    dispatch(setCategories(category));
    dispatch(fetchProducts(category, 10, 0));
  };

  const handleScroll = useCallback(() => {
    if (!hasMore || loading) return;
    const bottom =
      window.innerHeight + window.scrollY >= document.body.offsetHeight - 100;
    if (bottom) {
      dispatch(fetchProducts(currentCategory, 10, products.length));
    }
  }, [dispatch, hasMore, loading, products.length, currentCategory]);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [handleScroll]);

  const formattedProducts = products.map((product) => ({
    "Product Name": product.title,
    Category: product.category,
    Price: `$${product.price}`,
    Rating: product.rating,
    Stock: product.stock,
  }));

  console.log("================================" + JSON.stringify(formattedProducts, null, 2));

  return (
    <div className="p-4 bg-black min-h-screen ">
      {/* Category Filters */}
      <div className="flex gap-4 mb-4">
      {categories.map((category) => (
        <button key={category.slug} className="px-4 py-2  bg-white">
            {category.name}
        </button>
        ))}

      </div>

      {/* Product Table */}
      {loading && products.length === 0 ? (
        <div className="flex justify-center items-center h-40">
          <Loader />
        </div>
      ) : (
        <TableDisplay headers={headers} rows={formattedProducts} />
      )}

      {/* Infinite Scroll Loader */}
      {loading && products.length > 0 && (
        <div className="flex justify-center items-center h-20">
          <Loader />
        </div>
      )}
    </div>
  );
};

export default Product;
