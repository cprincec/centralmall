import Styles from "../css/main-styles/signup.module.css";
import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { RiEyeLine, RiEyeCloseLine } from "react-icons/ri";
import UserContext from "../contexts/user";
import Cookies from "universal-cookie";

const LogIn = () => {
  const [passwordVisible, setPasswordVisible] = useState(false);
  const { user, logIn } = useContext(UserContext);

  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };
  const cookies = new Cookies();
  const navigate = useNavigate();

  function handleSignUp(e) {
    e.preventDefault();

    const loginData = {
      email: e.target["email"].value,
      password: e.target["password"].value,
    };
    console.log(loginData);
    fetch("https://centeralmall.onrender.com/users/login", {
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(loginData),
    })
      .then((response) => response.json())
      .then((data) => {
        cookies.set("token", data.token, { path: "/" });
        cookies.set("id", data.user._id, { path: "/" });
        logIn(data.user);
        navigate("/", { replace: true });
      })
      .catch((error) => console.log("user data error", error));
  }

  return (
    <>
      <form onSubmit={handleSignUp} name="loginForm" method="get">
        <div className={Styles["form-box"]}>
          <label htmlFor="email">Email</label>
          <input type="email" name="email" id="email" />
        </div>

        <div className={Styles["form-box"]}>
          <label htmlFor="password">Password</label>
          <div className={Styles.password}>
            <input
              type={passwordVisible ? "text" : "password"}
              name="password"
              id="password"
            />
            <button
              type="button"
              className={Styles.toggle}
              onClick={togglePasswordVisibility}
            >
              {passwordVisible ? <RiEyeCloseLine /> : <RiEyeLine />}
            </button>
          </div>
        </div>

        <button type="submit" className={`button ${Styles.signup}`}>
          LOG IN
        </button>
      </form>
      <div className={Styles.divider}>
        <hr /> <span>OR</span>
        <hr />
      </div>
      <button>LOGIN WITH GOOGLE</button>
    </>
  );
};

export default LogIn;
