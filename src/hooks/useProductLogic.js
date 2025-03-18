import { useEffect, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  fetchProducts,
  fetchCategories,
  setCategory,
  openModal,
} from '../redux/reducers/product';
import {
  selectProducts,
  selectCategories,
  selectSelectedCategory,
  selectHasMore,
  selectLoading,
} from '../redux/selectors/product';

const useProductLogic = () => {
  const dispatch = useDispatch();
  const products = useSelector(selectProducts);
  const categories = useSelector(selectCategories);
  const currentCategory = useSelector(selectSelectedCategory);
  const hasMore = useSelector(selectHasMore);
  const loading = useSelector(selectLoading);

  useEffect(() => {
    dispatch(fetchCategories());
    dispatch(fetchProducts());
  }, [dispatch]);

  const handleCategoryClick = (category) => {
    dispatch(setCategory(category));
    dispatch(fetchProducts());
  };

  const handleScroll = useCallback(() => {
    if (!hasMore || loading) return;
    const bottom =
      window.innerHeight + window.scrollY >= document.body.offsetHeight - 100;
    if (bottom) {
      dispatch(fetchProducts());
    }
  }, [hasMore, loading, dispatch]);

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [handleScroll]);

  const handleAddProduct = () => {
    dispatch(openModal({ mode: 'add' }));
  };

  const handleEditProduct = (product) => {
    dispatch(openModal({ mode: 'edit', productData: product }));
  };

  return {
    products,
    categories,
    currentCategory,
    loading,
    handleCategoryClick,
    handleAddProduct,
    handleEditProduct,
  };
};

export default useProductLogic;
