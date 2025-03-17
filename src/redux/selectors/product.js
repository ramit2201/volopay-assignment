import { createSelector } from "@reduxjs/toolkit";

const selectProductsState = (state) => state.products;

export const selectProducts = createSelector(
  [selectProductsState],
  (products) => products.products || []
);

export const selectCategories = createSelector(
  [selectProductsState],
  (products) => products.categories || []
);

export const selectSelectedCategory = createSelector(
  [selectProductsState],
  (products) => products.category || null
);

export const selectLoading = createSelector(
  [selectProductsState],
  (products) => products.loading
);

export const selectHasMore = createSelector(
  [selectProductsState],
  (products) => products.hasMore
);

export const selectError = createSelector(
  [selectProductsState],
  (products) => products.error
);
export const selectIsModalOpen = createSelector(
  [selectProductsState],
  (productState) => productState.isModalOpen
);

export const selectModalMode = createSelector(
  [selectProductsState],
  (productState) => productState.modalMode
);

export const selectModalProductData = createSelector(
  [selectProductsState],
  (productState) => productState.modalProductData
);
