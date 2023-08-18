import { useState } from "react";
import Styles from "../css/main-styles/signup.module.css";
import { Link, Outlet, useLocation } from "react-router-dom";
const SignUpLogIn = ({ children }) => {
  const action = useLocation().pathname.split("/").pop();

  return (
    <section className={Styles.container}>
      <div className={Styles["select-action"]}>
        <button className={`${action !== "login" && Styles["active-form"]}`}>
          <Link to={"./signup"}>SIGN UP</Link>
        </button>

        <button className={`${action === "login" && Styles["active-form"]}`}>
          <Link to={"./login"}>LOG IN </Link>
        </button>
      </div>
      <div className={`${Styles["form-wrapper"]}`}>
        <Outlet />
      </div>
    </section>
  );
};

export default SignUpLogIn;
