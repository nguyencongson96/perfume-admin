import { Provider } from "react-redux";
import store from "./redux/store/index";
import "./styles/global.css";
import { Route, Routes } from "react-router-dom";
import ProductLayout from "./pages/product";
import AdminRoutes from "./routes/admin";
import LazyLoading from "./components/loading";
import OrderLayout from "./pages/order";

function App() {
  return (
    <Provider store={store}>
      <Routes>
        <Route path="/admin" element={<AdminRoutes />}>
          <Route index element={<ProductLayout />} />
          <Route path="product" element={<ProductLayout />} />
          <Route path="order" element={<OrderLayout />} />
        </Route>
      </Routes>
      <LazyLoading />
    </Provider>
  );
}

export default App;
