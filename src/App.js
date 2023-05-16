import { Provider } from "react-redux";
import store from "./redux/store";
import "./styles/global.css";
import { Route, Routes } from "react-router-dom";
import ProductLayout from "./pages/product";
import AdminRoutes from "./routes/admin";
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
    </Provider>
  );
}

export default App;
