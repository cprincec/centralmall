import Header from "./Header";
import { CartContextProvider } from "../contexts/cart";
import { SignUpContextProvider, UserContextProvider } from "../contexts/user";
import GeneralContext, { GeneralContextProvider } from "../contexts/general";
import Cart from "./Cart";
import { Outlet, useParams } from "react-router-dom";
import Notification from "./Notification";

const Layout = ({ children }) => {
  console.log(useParams());
  return (
    <GeneralContextProvider>
      <UserContextProvider>
        <CartContextProvider>
          <Header />
          <main>
            <SignUpContextProvider>{children}</SignUpContextProvider>
          </main>
        </CartContextProvider>
      </UserContextProvider>
    </GeneralContextProvider>
  );
};

export default Layout;
