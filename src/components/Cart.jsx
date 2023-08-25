import { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import CartContext from "../contexts/cart";
import Styles from "../css/main-styles/Cart.module.css";
import productStyles from "../css/main-styles/productDetails.module.css";
import { RiDeleteBinLine } from "react-icons/ri";
import { RiCloseCircleFill } from "react-icons/ri";
import {
  calculateProductQuantity,
  calculateCartTotal,
  calculateCartQuantity,
} from "../utils";
import { RiSubtractLine, RiAddLine } from "react-icons/ri";

const Cart = () => {
  const [animationState, setAnimationState] = useState("");
  const { cart, addProduct, removeProduct, setDisplay, display } =
    useContext(CartContext);
  const cartTotal = calculateCartTotal(cart);

  useEffect(() => {
    if (display) setAnimationState("visible");
    else setAnimationState("hidden");
  }, [display]);

  return (
    <section
      className={`${Styles["cart-container"]} ${Styles[animationState]}`}
    >
      <div className={Styles["cart-header"]}>
        <h1>Shopping Cart</h1>
        <RiCloseCircleFill
          className={Styles["close-cart"]}
          onClick={setDisplay}
        />
      </div>
      <hr />
      <div className={Styles["cart-items"]}>
        {!calculateCartQuantity(cart) && <p>Your cart is empty!</p>}
        {cart?.length > 0 &&
          cart.map((product) => (
            <>
              <section className={Styles["cart-item"]}>
                <picture>
                  <img
                    src={product.images ? product.images[0] : product.image}
                    alt={product.title}
                  />
                </picture>
                <div>
                  <h2 className={Styles.title}>{product.title}</h2>
                  <p className={Styles.price}>${product.total.toFixed(2)}</p>
                  <button
                    className={Styles["remove-item"]}
                    onClick={() => {
                      removeProduct(product.id, product.shop, true);
                    }}
                  >
                    Remove
                  </button>
                </div>

                <span
                  className={`${productStyles["set-quantity"]} ${Styles.quantity}`}
                >
                  <button
                    onClick={() => {
                      removeProduct(product.id, product.shop);
                    }}
                  >
                    <RiSubtractLine style={{ fontWeight: 700 }} />
                  </button>
                  <input
                    type="number"
                    value={calculateProductQuantity(cart, product)}
                    disabled
                  />
                  <button
                    onClick={() => {
                      addProduct(product, product.shop);
                    }}
                  >
                    <RiAddLine />
                  </button>
                </span>
              </section>
            </>
          ))}
      </div>
      {cart && calculateCartQuantity(cart) ? (
        <>
          <article className={Styles.subtotal}>
            <p>Subtotal: </p> <h3>${cartTotal.toFixed(2)}</h3>
          </article>
          <hr />
          <button className={`button ${Styles.checkout}`}>CHECKOUT</button>
        </>
      ) : null}
    </section>
  );
};

export default Cart;
