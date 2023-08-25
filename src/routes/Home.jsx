import useFetch from "../hooks/useFetch";
import Styles from "../css/main-styles/Home.module.css";
import { Link, useParams } from "react-router-dom";
import { LuLoader } from "react-icons/lu";
import { useRef, useState, useContext, useEffect } from "react";
import Products from "../components/Products";
import GeneralContext from "../contexts/general";

const Home = () => {
  const params = useParams();

  const categoriesData = useFetch(
    `https://centeralmall.onrender.com/Shops/${params.shopId}/categories`,
    `${params.shopId}-categories`
  );

  const { changeShop } = useContext(GeneralContext);
  // Store the current shop in context
  useEffect(() => {
    changeShop(params.shopId);
  }, [params.shopId]);

  return (
    <div className={Styles.home}>
      {/* Categories */}
      {categoriesData.isLoading && (
        <div className="mini-loading">
          <LuLoader />
        </div>
      )}
      {categoriesData.error && (
        <div className="error">{categoriesData.error}</div>
      )}
      {categoriesData.data && (
        <>
          <h2>Categories</h2>
          <section className={Styles["categories-container"]}>
            {categoriesData.data.map((category) => (
              <Link
                key={category?.name ? category.name : category}
                className={`${Styles.category} button`}
              >
                <h3>{category?.name ? category.name : category}</h3>
              </Link>
            ))}
          </section>
        </>
      )}

      {/* All products */}
      <h2>Our products</h2>
      <Products />
    </div>
  );
};

export default Home;
