import { createContext, useEffect, useState } from "react";

const CartContext = createContext({
  cart: [],
  display: false,
  setDisplay: () => {},
  addProduct: () => {},
  removeProduct: () => {},
  changeQuantity: () => {},
});

export const CartContextProvider = ({ children }) => {
  const [cart, setCart] = useState(
    localStorage.getItem("cart") ? JSON.parse(localStorage.getItem("cart")) : []
  );

  const [displayCart, setDisplayCart] = useState(false);

  // adding the shopId prevents clashing of products with same Id from different shops
  function addProduct(product, shopId) {
    let newCart = [...cart];

    // Check for product in cart
    let existingIndex = newCart.findIndex(
      (pro) => pro.id === product.id && pro.shop === shopId
    );
    if (existingIndex >= 0) {
      newCart[existingIndex].quantity++;
      newCart[existingIndex].total += newCart[existingIndex].price;
    } else {
      let newProduct = {
        ...product,
        quantity: 1,
        total: product.price,
        shop: shopId,
      };
      newCart = [...newCart, newProduct];
    }
    setCart(() => newCart);
  }
  
  function changeQuantity(productId, shopId, quantity) {
    console.log(productId, shopId, quantity);
    let newCart = [...cart];
    let index = newCart.findIndex(
      (product) => product.id === productId && product.shop === shopId
    );
    if (index >= 0) {
      newCart[index].quantity = quantity;
    }
    setCart(newCart);
  }

  // adding the shopId prevents clashing of products with same Id from different shops
  function removeProduct(productId, shopId, remove = false) {
    let newCart = [...cart];
    let index = newCart.findIndex(
      (pro) => pro.id === productId && pro.shop === shopId
    );

    if (remove) {
      newCart = newCart.filter(
        (product) => product.id !== productId && product.shop === shopId
      );
      setCart(newCart);
      return;
    }

    if (index >= 0) {
      console.log("found");
      newCart[index].quantity -= 1;
      newCart[index].total -= newCart[index].price;
    }

    if (index >= 0 && newCart[index].quantity < 1) {
      newCart = newCart.filter(
        (product) => product.id !== productId && product.shop === shopId
      );
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
    changeQuantity,
  };
  return (
    <CartContext.Provider value={cartContextValue}>
      {children}
    </CartContext.Provider>
  );
};

export default CartContext;
