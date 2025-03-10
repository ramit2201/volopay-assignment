import { configureStore } from '@reduxjs/toolkit';
import stockReducer from "../redux/reducers/stockReducer"

export const store = configureStore({
  reducer: {
    stocks : stockReducer,
  },
});
