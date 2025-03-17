import { useEffect, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchProducts,
  fetchCategories,
  setCategory, 
  openModal
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
import CategoryButtons from "../components/CategoryButtons"; 
import { PRODUCT_HEADERS, PRODUCT_TABLE_HEADERS } from "../constants/product"; 
import ProductFormModal from "../components/ProductFormModal";



const Product = () => {
  const dispatch = useDispatch();
  const products = useSelector(selectProducts);
  const categories = useSelector(selectCategories);
  const currentCategory = useSelector(selectSelectedCategory);
  const hasMore = useSelector(selectHasMore);
  const loading = useSelector(selectLoading);

  // Fetch categories & initial products
  useEffect(() => {
    dispatch(fetchCategories());
    dispatch(fetchProducts()); 
  }, []);

  // Handle category selection
  const handleCategoryClick = (category) => {
    dispatch(setCategory(category)); 
    dispatch(fetchProducts()); 
  };
  const queryParams = new URLSearchParams(location.search);
    const categoryFromUrl = queryParams.get("category");


    

  useEffect(() => {
        if (categoryFromUrl) {
      dispatch(setCategory(categoryFromUrl));
      dispatch(fetchProducts(categoryFromUrl, 10, 0));
    } 
    
  }, [categoryFromUrl]);

  // Infinite scrolling logic
  const handleScroll = useCallback(() => {
    if (!hasMore || loading) return;
    const bottom =
      window.innerHeight + window.scrollY >= document.body.offsetHeight - 100;

      
      
    if (bottom) {
      dispatch(fetchProducts()); // Fetch next batch of products
    }
  }, [ hasMore, loading]);

  // Attach & remove scroll event listener
  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [handleScroll]);

   // Format product data for the table
   const formattedProducts = products.map((product) => ({
    [PRODUCT_HEADERS.PRODUCT_NAME]: product.title,
    [PRODUCT_HEADERS.CATEGORY]: product.category,
    [PRODUCT_HEADERS.PRICE]: `$${product.price}`,
    [PRODUCT_HEADERS.RATING]: product.rating,
    [PRODUCT_HEADERS.STOCK]: product.stock,
    [PRODUCT_HEADERS.ACTIONS]: (
      <button
        className="bg-gray-400 text-black px-3 py-1 rounded hover:bg-yellow-600"
        onClick={() => {
          console.log("Edit clicked for product:", product); // ← Add this line
          dispatch(openModal({ mode: 'edit', productData: product })); // Fix: productData
        }}
      >
        Edit
      </button> )
  }));

  return (
    <div className="p-4 bg-black min-h-screen">
      {/* Category Filters */}
      <div className="flex gap-4 mb-4">
        <CategoryButtons
          categories={categories}
          selectedCategory={currentCategory}
          onCategoryClick={handleCategoryClick}
        />
        
      </div>
      <div className=" flex justify-center items-center">
      <button
          className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 flex gap-1 m-2"
          onClick={() => dispatch(openModal({ mode: 'add' }))}
        >
          <i class="fa-solid fa-plus mt-1"></i>
          Add Item
        </button>
      </div>
      <ProductFormModal />
      {/* Product Table */}
      {loading && products.length === 0 ? (
        <div className="flex justify-center items-center h-40">
          <Loader />
        </div>
      ) : (
        <TableDisplay headers={PRODUCT_TABLE_HEADERS} rows={formattedProducts} />
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
