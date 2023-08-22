import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./css/App.css";
import PreHome from "./routes/PreHome";
import Home from "./routes/Home";
import ProductDetail from "./routes/ProductDetail";
import Layout from "./components/layout";
import SignUp from "./routes/SignUp";
import SignUpLogIn from "./routes/SignUpLogIn";
import LogIn from "./routes/LogIn";
import UserContext from "./contexts/user";
import { useContext, useEffect } from "react";
import Cookies from "universal-cookie";

function App() {


  return (
    <>
      <BrowserRouter>
        <Layout>
          <Routes>
            <Route path="/" element={<PreHome />} />
            <Route path="/:shopId/products" element={<Home />} />
            <Route
              path="/:shopId/products/:productId"
              element={<ProductDetail />}
            />
            <Route path="/signup-login" element={<SignUpLogIn />}>
              <Route element={<SignUp action={"signUp"} />} index />
              <Route path="signup" element={<SignUp action={"signUp"} />} />
              <Route path="login" element={<LogIn action={"logIn"} />} />
            </Route>
          </Routes>
        </Layout>
      </BrowserRouter>
      {/* return (
      <BrowserRouter>
        <Layout>
          <Routes>
            <Route path="/" element={<Dashboard />} />

            <Route path="/orders" element={<OrdersRoot />}>
              <Route element={<Orders />} index />

              <Route path=":id" element={<OrderDetail />} />
            </Route>
          </Routes>
        </Layout>
      </BrowserRouter>
      ); */}
    </>
  );
}

export default App;
