import { useEffect, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchProducts } from "../../redux/reducers/product";
import {
  selectProducts,
  selectHasMore,
  selectLoading,
} from "../../redux/selectors/product";
import { PRODUCT_HEADERS, PRODUCT_TABLE_HEADERS } from "../../constants/product";
import TableDisplay from "../core/Table";
import Loader from "../core/Loader";

const ProductTable = () => {
  const dispatch = useDispatch();
  const products = useSelector(selectProducts);
  const hasMore = useSelector(selectHasMore);
  const loading = useSelector(selectLoading);

  // Fetch initial products
  useEffect(() => {
    dispatch(fetchProducts());
  }, []);

  // Infinite scroll logic
  const handleScroll = useCallback(() => {
    if (!hasMore || loading) return;
    const bottom = window.innerHeight + window.scrollY >= document.body.offsetHeight - 100;

    if (bottom) {
      dispatch(fetchProducts());
    }
  }, [hasMore, loading]);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [handleScroll]);

  // Format product data
  const formattedProducts = products.map((product) => ({
    [PRODUCT_HEADERS.PRODUCT_NAME]: product.title,
    [PRODUCT_HEADERS.CATEGORY]: product.category,
    [PRODUCT_HEADERS.PRICE]: `$${product.price}`,
    [PRODUCT_HEADERS.RATING]: product.rating,
    [PRODUCT_HEADERS.STOCK]: product.stock,
  }));

  return (
    <>
      {loading && products.length === 0 ? (
        <div className="flex justify-center items-center h-40">
          <Loader />
        </div>
      ) : (
        <TableDisplay headers={PRODUCT_TABLE_HEADERS} rows={formattedProducts} />
      )}

      {loading && products.length > 0 && (
        <div className="flex justify-center items-center h-20">
          <Loader />
        </div>
      )}
    </>
  );
};

export default ProductTable;
