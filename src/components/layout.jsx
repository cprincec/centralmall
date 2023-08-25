import Header from "./Header";
import { CartContextProvider } from "../contexts/cart";
import { UserContextProvider } from "../contexts/user";
import { GeneralContextProvider } from "../contexts/general";
import Cart from "./Cart";
import { useParams } from "react-router-dom";

const Layout = ({ children }) => {
  console.log(useParams());
  return (
    <GeneralContextProvider>
      <UserContextProvider>
        <CartContextProvider>
          <Header />
          <main>{children}</main>
        </CartContextProvider>
      </UserContextProvider>
    </GeneralContextProvider>
  );
};

export default Layout;
