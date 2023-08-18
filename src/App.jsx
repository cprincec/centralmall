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

function App() {
  const { isLoggedIn, logIn } = useContext(UserContext);
  useEffect(() => {
    //if user is not loggedin but has an active session in the server
    if (!isLoggedIn && document.cookie.includes("sessionCookieName=")) {
      fetch("https://centeralmall.onrender.com/auth/refresh", {
        method: "get",
        credentials: "include",
      })
        .then((response) => response.json())
        .then((data) => {
          logIn(data);
          console.log(data);
        })
        .catch((error) => console.log(error));
    }
  }, []);

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
