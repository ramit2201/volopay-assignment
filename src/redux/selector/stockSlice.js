import { createSelector } from '@reduxjs/toolkit';

// Base selector to get stock state from Redux store
const selectStocksState = (state) => state.stocks;

// Memoized selector for top gainers
export const selectTopGainers = createSelector(
  [selectStocksState],
  (stocks) => stocks.topGainers || []
);

// Memoized selector for top losers
export const selectTopLosers = createSelector(
  [selectStocksState],
  (stocks) => stocks.topLosers || []
);
