import Header from "./Header";
import { CartContextProvider } from "../contexts/cart";
import { UserContextProvider } from "../contexts/user";
import Cart from "./Cart";

const Layout = ({ children }) => {
  return (
    <UserContextProvider>
      <CartContextProvider>
        <Header />
        <main>{children}</main>
      </CartContextProvider>
    </UserContextProvider>
  );
};

export default Layout;
