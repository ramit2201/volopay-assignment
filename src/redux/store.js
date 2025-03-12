import { configureStore } from '@reduxjs/toolkit';
import stockReducer from "./reducers/stock"
import companyReducer from "./reducers/company"
import productReducer from "./reducers/product"
export const store = configureStore({
  reducer: {
    stocks : stockReducer,
    company: companyReducer,
    products : productReducer
  },
});
