import { Routes, Route } from "react-router";
import HomePage from "./pages/HomePage";
import "./App.css";

function App() {
  return (
    <>
      <Routes>
        <Route index element={<HomePage />} />
        <Route path="checkout" element={<div>checkout page</div>} />
        <Route path="orders" element={<div>orders page</div>} />
      </Routes>
    </>
  );
}

export default App;
