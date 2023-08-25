import Styles from "../css/main-styles/Home.module.css";
import { LuLoader } from "react-icons/lu";
import useFetch from "../hooks/useFetch";
import { Link, useParams } from "react-router-dom";
import { useRef, useState, useContext, useEffect } from "react";
import { generateratingStars } from "../utils";
import CartContext from "../contexts/cart";
import useHideComponent from "../hooks/useHideComponent";
const Products = () => {
  const params = useParams();
  const [showOverlayStates, setShowOverlayStates] = useState([]);
  const { data, isLoading, error } = useFetch(
    `https://centeralmall.onrender.com/Shops/${params.shopId}/products`,
    `${params.shopId}`
  );
  const cartCtx = useContext(CartContext);
  useEffect(() => {
    data && setShowOverlayStates(() => data.map(() => false));
  }, [data]);

  function toggleOverlay(index) {
    const newStates = showOverlayStates.map((state, i) =>
      i === index ? !state : false
    );
    setShowOverlayStates(newStates);
  }

  // make overlay disappear when i click outside
  const productRef = useRef(null);
  useHideComponent(productRef, () => {
    const newStates = showOverlayStates.map(() => false);
    setShowOverlayStates(newStates);
  });

  return (
    <>
      {isLoading && (
        <div className="loading">
          <LuLoader />
        </div>
      )}
      {error && <p>{error}</p>}
      <div
        className={`${Styles["products-container"]} product-card`}
        ref={productRef}
      >
        {data &&
          data.map((product, index) => (
            <div
              className={`${Styles["product-card-wrapper"]} `}
              onClick={() => {
                toggleOverlay(index);
              }}
              key={product.id}
            >
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

              <span
                className={`${Styles["add-to-cart-overlay"]} ${
                  showOverlayStates[index] ? Styles.visible : ""
                }`}
              >
                <button
                  onClick={() => {
                    cartCtx.addProduct(product, params.shopId);
                  }}
                  className=""
                >
                  Add to cart
                </button>
                <Link to={`./${product.id}`}>
                  <button className="view-product">View product</button>
                </Link>
              </span>
            </div>
          ))}
      </div>
    </>
  );
};

export default Products;
