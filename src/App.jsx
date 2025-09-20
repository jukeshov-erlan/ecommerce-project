import axios from "axios";
import { useState, useEffect } from "react";
import { Routes, Route } from "react-router";
import HomePage from "./pages/home/HomePage";
import CheckoutPage from "./pages/checkout/CheckoutPage";
import OrdersPage from "./pages/orders/OrdersPage";
import TrackingPage from "./pages/TrackingPage";
import PageNotFound from "./pages/PageNotFount";
import "./App.css";

function App() {
  const [cart, setCart] = useState([]);

  useEffect(() => {
    async function fetchAppData() {
      try {
        const response = await axios.get("/api/cart-items?expand=product");
        setCart(response.data);
      } catch (err) {
        console.error(err);
      }
    }
    fetchAppData();
  }, []);
  return (
    <>
      <Routes>
        <Route index element={<HomePage cart={cart} />} />
        <Route path="checkout" element={<CheckoutPage cart={cart} />} />
        <Route path="orders" element={<OrdersPage cart={cart} />} />
        <Route path="tracking" element={<TrackingPage />} />
        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </>
  );
}

export default App;
