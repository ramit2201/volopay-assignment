import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

// Initial state
const initialState = {
  products: [],
  categories: [],
  category: null,
  limit: 15,
  skip: 0,
  loading: false,
  hasMore: true,
  error: null,
};

// API Endpoints
const BASE_URL = "https://dummyjson.com/products";

const fetchProductsAPI = async (limit, skip, category) => {
  const url = category
    ? `${BASE_URL}/category/${category}?limit=${limit}&skip=${skip}`
    : `${BASE_URL}?limit=${limit}&skip=${skip}`;

  const response = await axios.get(url);

  return response.data.products;
};

const fetchCategoriesAPI = async () => {
  const response = await axios.get(`${BASE_URL}/categories`);
  return response.data.slice(0, 5); // Top 5 categories
};

// Slice
const productsSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    setProducts: (state, action) => {
      if (state.skip === 0) {
        state.products = action.payload;
      } else {
        state.products = [...state.products, ...action.payload];
      }
      state.hasMore = action.payload.length > 0;
    },
    setCategories: (state, action) => {
      state.categories = action.payload;
    },
    setCategory: (state, action) => {
      state.category = action.payload;
      state.skip = 0; // Reset pagination when category changes
      state.products = []; // Clear products when switching category
    },
    increaseSkip: (state) => {
      state.skip += state.limit;
    },
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
    },
  },
});

// Action creators
export const {
  setProducts,
  setCategories,
  setCategory,
  increaseSkip,
  setLoading,
  setError,
} = productsSlice.actions;

// Async Actions
export const fetchProducts = () => async (dispatch, getState) => {
  const { limit, skip, category } = getState().products;
  dispatch(setLoading(true));

  try {
    const products = await fetchProductsAPI(limit, skip, category);
    dispatch(setProducts(products));
    dispatch(increaseSkip()); // Move to the next set of data
  } catch (error) {
    dispatch(setError(error.message));
  } finally {
    dispatch(setLoading(false));
  }
};

export const fetchCategories = () => async (dispatch) => {
  dispatch(setLoading(true));
  try {
    const categories = await fetchCategoriesAPI();
    dispatch(setCategories(categories));
  } catch (error) {
    dispatch(setError(error.message));
  } finally {
    dispatch(setLoading(false));
  }
};

export default productsSlice.reducer;
