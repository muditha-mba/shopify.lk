import Product from "./pages/Product";
import Home from "./pages/Home";
import ProductList from "./pages/ProductList";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Cart from "./pages/Cart";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import Success from "./pages/Success";
import { useSelector } from "react-redux";

const App = () => {
  /* const currentUser = JSON.parse(
    JSON.parse(localStorage.getItem("persist:root")).user
  ).currentUser;
  console.log("current user: ", currentUser); */

  const user = useSelector((state) => state.user.currentUser);
  console.log("user: ", user);
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="products/:category" element={<ProductList />} />
        <Route path="product/:id" element={<Product />} />
        <Route path="cart" element={<Cart />} />
        <Route
          path="login"
          element={user ? <Navigate to={"/"} /> : <Login />}
        />
        <Route
          path="register"
          element={user ? <Navigate to={"/"} /> : <Register />}
        />
        <Route path="success" element={<Success />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
