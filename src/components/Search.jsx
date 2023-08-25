import { useContext, useEffect, useRef, useState } from "react";
import useFetch from "../hooks/useFetch";
import { BiSearchAlt2 } from "react-icons/bi";
import { IoClose } from "react-icons/io5";
import searchFormStyles from "../css/main-styles/searchForm.module.css";
import { useNavigate, useParams, Link } from "react-router-dom";
import GeneralContext from "../contexts/general";

const SearchForm = ({ setIsSearching }) => {
  const [searchResults, setSearchResults] = useState([]);
  const { currentShop } = useContext(GeneralContext);
  const searchInput = useRef(null);
  useEffect(() => {
    searchInput.current.focus();
  }, []);

  async function search(searchString) {
    if (searchString) {
      if (localStorage.getItem(currentShop)) {
        const products = await JSON.parse(localStorage.getItem(currentShop));
        const results = products.filter((product) =>
          product.title.toLowerCase().includes(searchString.toLowerCase())
        );
        // console.log(results);
        setSearchResults(results);
      }
    } else {
      setSearchResults([]);
    }
  }
  return (
    <div className={searchFormStyles["search-page"]}>
      <button
        className={searchFormStyles.close}
        onClick={() => setIsSearching(false)}
      >
        <IoClose />
      </button>
      <form action="">
        <button>
          <BiSearchAlt2 />
        </button>
        <input
          name="search-product"
          placeholder="Search for products"
          ref={searchInput}
          onChange={(e) => {
            search(e.target.value);
          }}
        />
      </form>
      <hr />
      <div
        className={`${searchFormStyles["search-results"]} ${
          searchResults.length && searchFormStyles["result-found"]
        }`}
      >
        {searchResults.length > 0 &&
          searchResults.map((product) => (
            <Link
              key={product.id}
              to={`/${currentShop}/products/${product.id}`}
              onClick={() => {
                setIsSearching(false);
                setSearchResults([]);
              }}
            >
              <img
                src={product.images ? product.images[0] : product.image}
                alt={product.title}
              />
              <h4>{product.title}</h4>
            </Link>
          ))}
      </div>
    </div>
  );
};

export default SearchForm;
