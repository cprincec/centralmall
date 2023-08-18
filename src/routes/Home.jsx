import useFetch from "../hooks/useFetch";
import Styles from "../css/main-styles/Home.module.css";
import { Link, useParams } from "react-router-dom";
import { LuLoader } from "react-icons/lu";
import { useRef, useState, useContext } from "react";
import { generateratingStars } from "../utils";
import CartContext from "../contexts/cart";

const Home = () => {
  const params = useParams();
  const { data, isLoading, error } = useFetch(
    `https://centeralmall.onrender.com/Shops/${params.shopId}/products`,
    `${params.shopId}`
  );

  const cartCtx = useContext(CartContext);

  return (
    <>
      {isLoading && (
        <div className="loading">
          <LuLoader />
        </div>
      )}
      {error && <p>{error}</p>}
      {!data && !error ? (
        <div className="loading">
          <LuLoader />
        </div>
      ) : (
        <div className={Styles["products-container"]}>
          {data.map((product) => (
            <div className={Styles["product-card-wrapper"]} key={product.id}>
              <article className={Styles["product-card"]}>
                <picture>
                  <img
                    src={product?.image ? product.image : product.images[0]}
                    alt={product.title}
                    loading="lazy"
                  />
                </picture>
                <div className={Styles["product-card-info"]}>
                  <h3>
                    {product.title.length > 60
                      ? `${product.title.substring(0, 60)}...`
                      : product.title}
                  </h3>
                  <div className={Styles["space-between-flex"]}>
                    <span className={Styles.price}>${product.price}</span>
                    {product.rating && (
                      <span>{generateratingStars(product.rating.rate)}</span>
                    )}
                  </div>
                </div>
              </article>

              <span className={`${Styles["add-to-cart-overlay"]}`}>
                <button
                  onClick={() => {
                    cartCtx.addProduct(product);
                  }}
                  className=""
                >
                  Add to cart
                </button>
                <Link to={`${product.id}`}>
                  <button className="view-product">View details</button>
                </Link>
              </span>
            </div>
          ))}
        </div>
      )}
    </>
  );
};

export default Home;
