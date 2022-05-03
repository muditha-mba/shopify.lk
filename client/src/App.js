import Product from "./pages/Product";
import Home from "./pages/Home";
import ProductList from "./pages/ProductList";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Cart from "./pages/Cart";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import Success from "./pages/Success";
import { useSelector } from "react-redux";
import PageNotFound from "./pages/PageNotFound";
import Search from "./pages/Search";

const App = () => {
  /* const currentUser = JSON.parse(
    JSON.parse(localStorage.getItem("persist:root")).user
  ).currentUser;
  console.log("current user: ", currentUser); */

  const user = useSelector((state) => state.user.currentUser);
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="products/:category" element={<ProductList />} />
        <Route path="product/:id" element={<Product />} />
        <Route path="search" element={<Search />} />
        <Route path="cart" element={user ? <Cart /> : <Navigate to={"/"} />} />
        <Route
          path="login"
          element={user ? <Navigate to={"/"} /> : <Login />}
        />
        <Route
          path="register"
          element={user ? <Navigate to={"/"} /> : <Register />}
        />
        <Route path="success" element={<Success />} />
        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
