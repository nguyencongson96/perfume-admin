import { configureStore } from "@reduxjs/toolkit";
import productsSlice from "./reducers/product/index";
import ordersSlice from "./reducers/order/index";

const store = configureStore({
  reducer: {
    products: productsSlice.reducer,
    orders: ordersSlice.reducer,
  },
});

export default store;
