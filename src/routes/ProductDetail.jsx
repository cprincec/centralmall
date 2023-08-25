import { useParams, useNavigate } from "react-router-dom";
import { useState } from "react";
import useFetch from "../hooks/useFetch";
import Styles from "../css/main-styles/productDetails.module.css";
import { useRef, useContext, useEffect } from "react";
import { RiSubtractLine, RiAddLine } from "react-icons/ri";
import { IoMdArrowRoundBack } from "react-icons/io";
import { generateratingStars, calculateProductQuantity } from "../utils";
import { LuLoader } from "react-icons/lu";
import CartContext from "../contexts/cart";
import shop from "../contexts/shops";

const ProductDetail = () => {
  const params = useParams();
  const navigate = useNavigate();
  const { data, isLoading, error } = useFetch(
    `https://centeralmall.onrender.com/Shops/${params.shopId}/products/${params.productId}`
  );

  const cartCtx = useContext(CartContext);

  function decreaseQuantity(productId, shopId) {
    cartCtx.removeProduct(productId, shopId);
  }

  function increaseQuantity(product, shopId) {
    cartCtx.addProduct(product, shopId);
  }

  // useEffect(() => {
  //   const productQuantity = ;
  //   setProductQuantity(productQuantity);
  // }, [cartCtx.cart, data]);

  return (
    <>
      {isLoading && (
        <div className="loading">
          <LuLoader />
        </div>
      )}
      {error && <p>{error}</p>}
      {data && (
        <div className={Styles.page}>
          <button
            className={Styles.previous}
            onClick={() => {
              navigate(-1);
            }}
          >
            <IoMdArrowRoundBack />
            Back
          </button>
          <section className={Styles["product-details-container"]}>
            <div className={Styles["product-details-images"]}>
              <picture className={Styles["product-details-main-image"]}>
                <img
                  src={data.image ? data.image : data.images[0]}
                  alt={data.title}
                  loading="lazy"
                />
              </picture>
              {data.images && (
                <div className={Styles["product-details-thumbnails"]}>
                  {data.images.map((image) => (
                    <picture key={data.title}>
                      <img
                        src={image}
                        alt={`${data.title} thumbnail`}
                        loading="lazy"
                      />
                    </picture>
                  ))}
                </div>
              )}
            </div>

            <div className={Styles["product-details-info-container"]}>
              <h1>{data.title}</h1>
              <p className={Styles.price}>${data.price}</p>
              {data?.rating ? (
                generateratingStars(data.rating.rate)
              ) : (
                <p>{data.rating.rate}</p>
              )}
              <p>{data.description}</p>
              <div className={Styles["product-details-actions"]}>
                {calculateProductQuantity(cartCtx.cart, data) >= 1 && (
                  <span className={Styles["set-quantity"]}>
                    <button
                      onClick={decreaseQuantity.bind(
                        null,
                        data.id,
                        params.shopId
                      )}
                    >
                      <RiSubtractLine style={{ fontWeight: 700 }} />
                    </button>
                    <input
                      type="number"
                      value={calculateProductQuantity(cartCtx.cart, data)}
                      disabled
                    />
                    <button
                      onClick={increaseQuantity.bind(null, data, params.shopId)}
                    >
                      <RiAddLine />
                    </button>
                  </span>
                )}
                {calculateProductQuantity(cartCtx.cart, data) < 1 && (
                  <button
                    onClick={increaseQuantity.bind(null, data, params.shopId)}
                    className=""
                  >
                    ADD TO CART
                  </button>
                )}
              </div>
            </div>
          </section>
        </div>
      )}
    </>
  );
};

export default ProductDetail;
