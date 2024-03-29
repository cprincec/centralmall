import { useEffect } from "react";
import shop from "../contexts/shops";
import useFetch from "../hooks/useFetch";
import styles from "../css/main-styles/Prehome.module.css";
import { Link } from "react-router-dom";
import { LuLoader } from "react-icons/lu";

const PreHome = () => {
  const { data, isLoading, error } = useFetch(
    "https://centeralmall.onrender.com/Shops/",
    "shops"
  );

  useEffect(() => {}, [isLoading]);

  return (
    <>
      {isLoading && (
        <div className="loading">
          <LuLoader />
        </div>
      )}
      <div className={styles["pre-homepage"]}>
        <div className={styles.mask}>
          {/* <h1>Welcome to</h1> */}
          <h1 className={styles.h1}>Central Mall</h1>
          {/* <h1>Welcome to CentralMall!</h1> */}
          <p className={styles.caption}>Your Ultimate Shopping Destination</p>
        </div>

        {error && <p>{error}</p>}
        <div className={styles["shops-container"]}>
          <p className={styles.instruction}>
            Select a shop to start shopping:{" "}
          </p>
          {data &&
            data.map((shop) => {
              return (
                <Link
                  key={shop._id}
                  id={shop._id}
                  className={`${styles.shop} button`}
                  to={`/${shop._id}/products`}
                >
                  <h2>{shop.name}</h2>
                </Link>
              );
            })}
        </div>
      </div>
    </>
  );
};

export default PreHome;
