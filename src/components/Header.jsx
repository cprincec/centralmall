import { BsCart4 } from "react-icons/bs";
import { BiSolidUserCircle, BiSearchAlt2 } from "react-icons/bi";
import { TfiMenu } from "react-icons/tfi";
import styles from "../css/header-styles/header.module.css";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useContext, useEffect, useState, useRef } from "react";

import CartContext from "../contexts/cart";
import UserContext from "../contexts/user";
import GeneralContext from "../contexts/general";

import { calculateCartQuantity } from "../utils";
import Cart from "./Cart";
import Cookies from "universal-cookie";
import useHideComponent from "../hooks/useHideComponent";
import SearchForm from "../components/Search";
import Notification from "./Notification";
import { createPortal } from "react-dom";

const Header = ({ props }) => {
  const params = useParams();
  const { showDialog, notificationMessage, errorNotification } =
    useContext(GeneralContext);
  // Cart context
  const { cart, display, setDisplay } = useContext(CartContext);
  // General context
  const { toggleSearching } = useContext(GeneralContext);
  // User context
  const { isLoggedIn, logIn, logOut, user } = useContext(UserContext);

  const [showProfileDropdown, setShowprofileDropdown] = useState(false);
  const [isSearching, setIsSeaching] = useState(false);
  const navigate = useNavigate();

  const quantity = calculateCartQuantity(cart);

  const cookies = new Cookies();
  useEffect(() => {
    //if user is not loggedin but has an active session in the server
    if (!isLoggedIn && cookies.get("token")) {
      const id = cookies.get("id");
      const token = cookies.get("token");
      fetch(`https://centeralmall.onrender.com/users/${id}`, {
        method: "get",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
        .then((response) => response.json())
        .then((data) => {
          logIn(data);
          console.log(user, data);
        })
        .catch((error) => console.log(error));
    }
  }, []);

  // make overlay disappear when i click outside
  const productRef = useRef(null);
  useHideComponent(productRef, () => {
    setShowprofileDropdown(false);
  });

  // Check for existing user session and get data for that user
  return (
    <>
      {showDialog
        ? createPortal(
            <Notification
              message={notificationMessage}
              error={errorNotification}
            />,
            document.getElementById("dialogs")
          )
        : null}

      <header>
        <button className={styles.hamburger}>
          <TfiMenu />
        </button>
        <Link to={"./"}>
          <svg
            width="157.95"
            height="24.120443349753693"
            viewBox="0 0 406 62"
            className={`css-1j8o68f ${styles.logo}`}
          >
            <defs id="SvgjsDefs5408"></defs>
            <g
              id="SvgjsG5409"
              // featurekey="symbolFeature-0"
              transform="matrix(0.506087738443012,0,0,0.506087738443012,0,-0.79565803832259)"
              fill="#38b000"
            >
              <path
                xmlns="http://www.w3.org/2000/svg"
                d="M71.9,74.2c0.1,0,0.2,0.1,0.3,0.1c0.4,0,0.8-0.3,1-0.7l2.5-7c0.2-0.5-0.1-1.1-0.6-1.3c-0.5-0.2-1.1,0.1-1.3,0.6l-2.5,7  C71.1,73.5,71.4,74,71.9,74.2z"
              ></path>
              <path
                xmlns="http://www.w3.org/2000/svg"
                d="M69.5,59.1l-6.6,3.1c-0.5,0.2-0.7,0.9-0.5,1.4c0.2,0.4,0.5,0.6,0.9,0.6c0.1,0,0.3,0,0.4-0.1l6.6-3.1  c0.5-0.2,0.7-0.9,0.5-1.4C70.6,59.1,70,58.9,69.5,59.1z"
              ></path>
              <path
                xmlns="http://www.w3.org/2000/svg"
                d="M71.8,52.5c0.2-0.5-0.1-1.1-0.6-1.3l-6.9-2.5c-0.5-0.2-1.1,0.1-1.3,0.6c-0.2,0.5,0.1,1.1,0.6,1.3l6.9,2.5  c0.1,0,0.2,0.1,0.4,0.1C71.3,53.2,71.6,52.9,71.8,52.5z"
              ></path>
              <path
                xmlns="http://www.w3.org/2000/svg"
                d="M77,48.3c0.1,0,0.3,0,0.4-0.1c0.5-0.2,0.7-0.9,0.5-1.4l-3.1-6.7c-0.2-0.5-0.9-0.7-1.4-0.5C73,39.8,72.8,40.5,73,41l3.1,6.7  C76.3,48,76.6,48.3,77,48.3z"
              ></path>
              <path
                xmlns="http://www.w3.org/2000/svg"
                d="M84.9,49.2c0.4,0,0.8-0.3,1-0.7l2.5-7c0.2-0.5-0.1-1.1-0.6-1.3c-0.5-0.2-1.1,0.1-1.3,0.6l-2.5,7c-0.2,0.5,0.1,1.1,0.6,1.3  C84.6,49.2,84.7,49.2,84.9,49.2z"
              ></path>
              <path
                xmlns="http://www.w3.org/2000/svg"
                d="M89.7,55.5c0.1,0,0.3,0,0.4-0.1l6.6-3.1c0.5-0.2,0.7-0.9,0.5-1.4c-0.2-0.5-0.9-0.7-1.4-0.5l-6.6,3.1  c-0.5,0.2-0.7,0.9-0.5,1.4C89,55.2,89.4,55.5,89.7,55.5z"
              ></path>
              <path
                xmlns="http://www.w3.org/2000/svg"
                d="M117.5,27.1H30.8c-3-14.1-11.2-15-11.9-15.1h-6.3c-1-2.4-3.3-4.5-6.1-4.5C2.9,7.5,0,10.4,0,14c0,3.6,2.9,6.6,6.5,6.6  c2.8,0,5.1-2.2,6.1-4.6h5.9c0.2,0,5.7,1.7,7.8,13.2c2.7,15.3,9.7,53.7,9.7,53.7c0,4.3,2.6,12.1,12.2,12.1h37l-1.5-3.9H48.1  c-4.1,0-5.9-3-6.7-5.1c6.5-0.4,24.3-1.6,40-2.7L80,78.4c-16,1.1-33.7,2.3-39.4,2.7C39.3,74.6,34.4,47,31.7,32h85.1  c3.9,0,6.7,3.2,6.2,7.1l-3.6,29.4c0,0.1-0.1,0.7-0.5,1.5l4.4,2.2c0.8-1.7,1-2.9,1-3.1l3.7-30.2C128.7,32.4,124.1,27.1,117.5,27.1z"
              ></path>
              <path
                xmlns="http://www.w3.org/2000/svg"
                d="M107.7,80.5l8.4-3.3c0.8-0.3,1.3-1,1.3-1.8c0-0.8-0.4-1.6-1.1-2L80.9,55.5c-0.7-0.4-1.6-0.3-2.3,0.3  C78,56.3,77.7,57.2,78,58l12,38.7c0.2,0.8,1,1.4,1.8,1.5c0.8,0.1,1.6-0.4,2-1.1l4.8-9.2l10.3,13.7c0.3,0.4,0.8,0.7,1.4,0.8  c0.1,0,0.2,0,0.3,0c0.4,0,0.9-0.1,1.3-0.4l6.3-4.9c0.4-0.3,0.7-0.8,0.8-1.4c0.1-0.6-0.1-1.1-0.4-1.6L107.7,80.5z M110.9,97.4  l-11-14.6c-0.4-0.5-1-0.8-1.6-0.8c-0.1,0-0.1,0-0.2,0c-0.7,0.1-1.3,0.5-1.7,1.1l-4,7.7l-9.1-29.3l26.9,13.6l-6.6,2.6  c-0.6,0.2-1.1,0.8-1.2,1.4c-0.2,0.6,0,1.3,0.4,1.8l11.2,14.2L110.9,97.4z"
              ></path>
              <path
                xmlns="http://www.w3.org/2000/svg"
                d="M99.2,103.7c-4.7,0-8.6,3.9-8.6,8.7c0,4.8,3.9,8.7,8.6,8.7c4.7,0,8.6-3.9,8.6-8.7C107.8,107.6,103.9,103.7,99.2,103.7z   M99.2,116.9c-2.5,0-4.5-2-4.5-4.5c0-2.5,2-4.5,4.5-4.5c2.5,0,4.5,2,4.5,4.5C103.7,114.8,101.7,116.9,99.2,116.9z"
              ></path>
              <path
                xmlns="http://www.w3.org/2000/svg"
                d="M49.7,103.7c-4.7,0-8.6,3.9-8.6,8.7c0,4.8,3.9,8.7,8.6,8.7c4.7,0,8.6-3.9,8.6-8.7C58.3,107.6,54.4,103.7,49.7,103.7z   M49.7,116.9c-2.5,0-4.5-2-4.5-4.5c0-2.5,2-4.5,4.5-4.5c2.5,0,4.5,2,4.5,4.5C54.2,114.8,52.2,116.9,49.7,116.9z"
              ></path>
            </g>
            <g
              id="SvgjsG5410"
              // featurekey="textGroupContainer"
              transform="matrix(1,0,0,1,405,0)"
              fill="#38b000"
            >
              <rect
                xmlns="http://www.w3.org/2000/svg"
                y="0"
                height="1"
                width="1"
                opacity="0"
              ></rect>
              <rect
                xmlns="http://www.w3.org/2000/svg"
                y="0"
                x="-320"
                width="3"
                height="62"
              ></rect>
            </g>
            <g
              id="SvgjsG5411"
              // featurekey="vMvB0T-0"
              transform="matrix(2.153316067110132,0,0,2.153316067110132,101.4496099314687,3.037033209943793)"
              fill="#38b000"
            >
              <path d="M8.66 11.78 l0 -0.24 q0 -2.96 -2.2 -2.96 q-1.26 0 -1.82 1.15 t-0.56 3.39 q0 2.22 0.7 3.3 t2.04 1.08 q0.7 0 1.55 -0.33 t1.85 -1.05 q0.5 0.34 0.93 0.93 t0.53 1.13 q-0.46 0.44 -1.07 0.83 t-1.32 0.67 t-1.48 0.45 t-1.55 0.17 q-1.54 0 -2.6 -0.59 t-1.71 -1.57 t-0.94 -2.26 t-0.29 -2.66 q0 -1.8 0.45 -3.15 t1.22 -2.25 t1.81 -1.35 t2.22 -0.45 q1.2 0 2.18 0.32 t1.67 0.88 t1.06 1.32 t0.37 1.64 q0 1.78 -1.82 1.78 q-0.54 0 -1.22 -0.18 z M16.84 15.96 l-0.02 1.44 l0 0.02 q0.92 -0.04 1.48 -0.04 l4.64 0 q0 0.74 -0.06 1.14 q-0.24 1.54 -2.04 1.54 l-5.32 0 q-0.86 0 -1.35 -0.5 t-0.49 -1.36 l0 -11.72 l0.14 -0.14 l8.62 0 q0.12 0.58 0.12 1.26 t-0.28 1.42 l-5.46 0 l0.02 1.44 l0 1.4 q0.52 -0.02 1.36 -0.02 l3.06 0 q0.18 0.56 0.18 1.28 t-0.18 1.32 l-4.42 0 l0 1.52 z M35.92 6.199999999999999 l0.14 0.14 l0 13.6 q-0.8 0.18 -1.89 0.18 t-1.93 -0.12 l-3.14 -7.16 q-0.56 -1.22 -1.14 -2.82 l-0.06 0.02 q0.24 2.92 0.24 5.98 l0 3.98 q-0.62 0.12 -1.5 0.12 t-1.48 -0.12 l0 -13.6 q0.76 -0.18 1.83 -0.18 t1.91 0.12 l3.1 7.14 q0.84 1.98 1.24 3.04 l0.08 -0.04 q-0.24 -2.78 -0.24 -5.9 l0 -2.44 q0 -1.04 0.42 -1.49 t1.36 -0.45 l1.06 0 z M44.260000000000005 8.98 l0.02 1.48 l0 9.54 q-0.68 0.12 -1.62 0.12 t-1.58 -0.12 l0 -11.02 l-1.28 0.02 l-2.06 0 q-0.12 -0.58 -0.12 -1.33 t0.12 -1.33 l9.9 0 q0.16 0.52 0.16 1.26 t-0.4 1.07 t-1.28 0.33 l-0.58 0 l-1.26 -0.02 l-0.02 0 z M59.080000000000005 10.56 q0 0.66 -0.2 1.25 t-0.53 1.06 t-0.78 0.82 t-0.93 0.53 q1.04 0.38 1.54 1.84 l0.6 1.7 q0.34 1 1 1.48 q-0.3 0.4 -0.9 0.67 t-1.32 0.27 t-1.12 -0.41 t-0.74 -1.43 l-0.72 -2.1 q-0.22 -0.6 -0.59 -0.92 t-1.11 -0.32 l-0.82 0 l0 5 q-0.64 0.12 -1.6 0.12 t-1.58 -0.12 l0 -13.56 l0.14 -0.14 q1.74 -0.04 2.93 -0.06 t1.87 -0.02 q1.1 0 2 0.27 t1.53 0.81 t0.98 1.36 t0.35 1.9 z M52.46000000000001 8.62 l0 3.92 q0.9 0 1.54 -0.03 t1.03 -0.24 t0.59 -0.59 t0.2 -1.1 q0 -1.94 -1.88 -1.94 l-0.83 0 t-0.65 -0.02 z M64.9 17.14 q-0.54 0 -0.8 -0.02 l-0.86 2.9 q-0.48 0.12 -1.34 0.12 q-0.96 0 -1.56 -0.22 l-0.1 -0.16 l4.4 -13.42 q0.78 -0.12 1.82 -0.12 q1.18 0 1.88 0.14 l4.32 13.44 q-0.7 0.38 -1.58 0.38 q-1.04 0 -1.46 -0.36 t-0.72 -1.38 l-0.38 -1.32 q-0.26 0.02 -0.78 0.02 l-2.84 0 z M64.84 14.620000000000001 l0.8 -0.02 l1.46 0 q0.1 0 0.35 0.01 t0.37 0.01 l-0.34 -1.24 q-0.48 -1.68 -1.1 -4.12 l-0.12 0 q-0.16 0.86 -0.96 3.82 z M79.4 17.3 l3.46 0 q0 0.8 -0.1 1.37 t-0.64 0.98 t-1.42 0.41 l-4.52 0 q-0.86 0 -1.36 -0.5 t-0.5 -1.36 l0 -11.86 l0.14 -0.14 l1.18 0 q1.88 0 1.88 2.04 l0 9.14 q0.88 -0.08 1.88 -0.08 z M84.36 19.96 l1.06 -13.6 q0.88 -0.16 2.08 -0.16 t2.1 0.16 l1.18 4.9 q0.7 3.32 0.74 3.62 l0.14 0 q0.08 -0.5 0.74 -3.62 l1.2 -4.9 q0.88 -0.16 2.08 -0.16 t2.1 0.16 l1.06 13.6 q-0.62 0.16 -1.53 0.16 t-1.49 -0.1 l-0.32 -5.56 q-0.14 -3.32 -0.16 -4.62 l-0.12 0 l-1.98 8.14 q-0.72 0.12 -1.65 0.12 t-1.65 -0.12 l-1.96 -8.14 l-0.14 0 q0 1.78 -0.16 4.62 l-0.3 5.56 q-0.58 0.1 -1.49 0.1 t-1.53 -0.16 z M104.76 17.14 q-0.54 0 -0.8 -0.02 l-0.86 2.9 q-0.48 0.12 -1.34 0.12 q-0.96 0 -1.56 -0.22 l-0.1 -0.16 l4.4 -13.42 q0.78 -0.12 1.82 -0.12 q1.18 0 1.88 0.14 l4.32 13.44 q-0.7 0.38 -1.58 0.38 q-1.04 0 -1.46 -0.36 t-0.72 -1.38 l-0.38 -1.32 q-0.26 0.02 -0.78 0.02 l-2.84 0 z M104.7 14.620000000000001 l0.8 -0.02 l1.46 0 q0.1 0 0.35 0.01 t0.37 0.01 l-0.34 -1.24 q-0.48 -1.68 -1.1 -4.12 l-0.12 0 q-0.16 0.86 -0.96 3.82 z M119.26 17.3 l3.46 0 q0 0.8 -0.1 1.37 t-0.64 0.98 t-1.42 0.41 l-4.52 0 q-0.86 0 -1.36 -0.5 t-0.5 -1.36 l0 -11.86 l0.14 -0.14 l1.18 0 q1.88 0 1.88 2.04 l0 9.14 q0.88 -0.08 1.88 -0.08 z M129.70000000000002 17.3 l3.46 0 q0 0.8 -0.1 1.37 t-0.64 0.98 t-1.42 0.41 l-4.52 0 q-0.86 0 -1.36 -0.5 t-0.5 -1.36 l0 -11.86 l0.14 -0.14 l1.18 0 q1.88 0 1.88 2.04 l0 9.14 q0.88 -0.08 1.88 -0.08 z"></path>
            </g>
          </svg>
        </Link>

        <div className={`${styles.flex} ${styles.icons}`}>
          {isLoggedIn ? (
            <>
              <button
                ref={productRef}
                onClick={() => {
                  setShowprofileDropdown((prevValue) => !prevValue);
                }}
                className={styles.initials}
              >{` ${user.firstName[0]}${user.lastName[0]}`}</button>
              <section
                className={`${
                  showProfileDropdown && styles["profile-dropdown"]
                } ${styles["profile-info"]}`}
              >
                <h2>
                  {user.firstName[0].toUpperCase() +
                    user.firstName.substring(1)}{" "}
                  {user.lastName[0].toUpperCase() + user.lastName.substring(1)}
                </h2>
                <button className="button">View profile</button>
                <button
                  className="button"
                  onClick={() => {
                    logOut(user);
                  }}
                >
                  Log out
                </button>
              </section>
            </>
          ) : (
            <BiSolidUserCircle
              className={styles["user-icon"]}
              onClick={() => {
                navigate("./signup-login");
              }}
            />
          )}

          <button className={styles.search}>
            <BiSearchAlt2
              onClick={() => {
                setIsSeaching((prevValue) => !prevValue);
              }}
            />
          </button>
          {isSearching && <SearchForm setIsSearching={setIsSeaching} />}
          <div className={styles["cart-container"]} onClick={setDisplay}>
            <BsCart4 className={styles.cart} />
            {quantity > 0 && (
              <span className={styles["cart-quantity"]}>{quantity}</span>
            )}
          </div>
        </div>
        <Cart />
      </header>
    </>
  );
};

export default Header;
