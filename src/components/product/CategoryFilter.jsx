import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchCategories,
  setCategory,
  fetchProducts,
} from "../../redux/reducers/product";
import {
  selectCategories,
  selectSelectedCategory,
} from "../../redux/selectors/product";
import CategoryButtons from "./CategoryButtons";

const CategoryFilter = () => {
  const dispatch = useDispatch();
  const categories = useSelector(selectCategories);
  const currentCategory = useSelector(selectSelectedCategory);

  // Fetch categories initially
  useEffect(() => {
    dispatch(fetchCategories());
  }, []);

  // Handle category click
  const handleCategoryClick = (category) => {
    dispatch(setCategory(category));
    dispatch(fetchProducts());
  };

  // Handle category from URL params
  useEffect(() => {
    const queryParams = new URLSearchParams(window.location.search);
    const categoryFromUrl = queryParams.get("category");

    if (categoryFromUrl) {
      dispatch(setCategory(categoryFromUrl));
      dispatch(fetchProducts(categoryFromUrl, 10, 0));
    }
  }, []);

  return (
    <div className="flex gap-4 mb-4">
      <CategoryButtons
        categories={categories}
        selectedCategory={currentCategory}
        onCategoryClick={handleCategoryClick}
      />
    </div>
  );
};

export default CategoryFilter;
