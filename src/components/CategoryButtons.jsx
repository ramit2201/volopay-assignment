import React from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  selectCategories,
  selectSelectedCategory,
} from "../redux/selectors/product";
import { setCategory, fetchProducts } from "../redux/reducers/product";
import { useNavigate } from "react-router-dom";

const CategoryButtons = () => {
  const categories = useSelector(selectCategories);
  const selectedCategory = useSelector(selectSelectedCategory);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleCategoryClick = (categorySlug) => {
    dispatch(setCategory(categorySlug));
    dispatch(fetchProducts());
    navigate(categorySlug ? `/products?category=${categorySlug}` : "/products"); // Reset URL
  };

  return (
    <div className="flex gap-4 mb-4">
      {/* "All" button to reset the filter */}
      <button
        onClick={() => handleCategoryClick(null)}
        className={`px-4 py-2 rounded-md transition ${
          selectedCategory ? "bg-gray-700 text-white" : "bg-white text-black"
        }`}
      >
        All
      </button>

      {/* Category buttons */}
      {categories.map((category) => (
        <button
          key={category.slug}
          onClick={() => handleCategoryClick(category.slug)}
          className={`px-4 py-2 rounded-md transition ${
            selectedCategory === category.slug
              ? "bg-white text-black"
              : "bg-gray-700 text-white"
          }`}
        >
          {category.name}
        </button>
      ))}

      {/* Home Button */}
      <button
        onClick={() => navigate("/home")}
        className="px-4 py-2 bg-sky-500 text-white rounded-md transition hover:bg-sky-600"
      >
        Home
      </button>
    </div>
  );
};

export default CategoryButtons;
