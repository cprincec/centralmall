import { createContext, useEffect, useState } from "react";

const CartContext = createContext({
  cart: [],
  display: false,
  setDisplay: () => {},
  addProduct: () => {},
  removeProduct: () => {},
});

export const CartContextProvider = ({ children }) => {
  const [cart, setCart] = useState(
    localStorage.getItem("cart") ? JSON.parse(localStorage.getItem("cart")) : []
  );

  const [displayCart, setDisplayCart] = useState(false);

  function addProduct(product) {
    let newCart = [...cart];

    // Check for product in cart
    let existingIndex = newCart.findIndex((pro) => pro.id === product.id);
    if (existingIndex >= 0) {
      newCart[existingIndex].quantity++;
      newCart[existingIndex].total += newCart[existingIndex].price;
    } else {
      let newProduct = {
        ...product,
        quantity: 1,
        total: product.price,
      };
      newCart = [...newCart, newProduct];
    }
    setCart(() => newCart);
  }

  function removeProduct(productId, remove = false) {
    let newCart = [...cart];
    let index = newCart.findIndex((pro) => pro.id === productId);

    if (remove) {
      newCart = newCart.filter((product) => product.id !== productId);
      setCart(newCart);
      return;
    }

    if (index >= 0) {
      console.log("found");
      newCart[index].quantity -= 1;
      newCart[index].total -= newCart[index].price;
    }

    if (newCart[index].quantity < 1) {
      newCart = newCart.filter((product) => product.id !== productId);
    }
    setCart(newCart);
  }

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  function toggleDisplayCart() {
    setDisplayCart((prevValue) => !prevValue);
  }

  const cartContextValue = {
    cart,
    display: displayCart,
    setDisplay: toggleDisplayCart,
    addProduct,
    removeProduct,
  };
  console.log(displayCart);
  return (
    <CartContext.Provider value={cartContextValue}>
      {children}
    </CartContext.Provider>
  );
};

export default CartContext;
