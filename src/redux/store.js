import { configureStore } from '@reduxjs/toolkit';
import stockReducer from "./reducers/stock"

export const store = configureStore({
  reducer: {
    stocks : stockReducer,
  },
});
