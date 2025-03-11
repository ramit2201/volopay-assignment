import { configureStore } from '@reduxjs/toolkit';
import stockReducer from "./reducers/stock"
import companyReducer from "./reducers/company"
export const store = configureStore({
  reducer: {
    stocks : stockReducer,
    company: companyReducer,
  },
});
