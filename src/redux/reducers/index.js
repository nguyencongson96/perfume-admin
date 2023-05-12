import { combineReducers } from "redux";
import productsReducer from "./product/index";
import loadingReducer from "./loading/index";
import ordersReducer from "./order";

const rootReducers = combineReducers({ productsReducer, loadingReducer, ordersReducer });

export default rootReducers;
