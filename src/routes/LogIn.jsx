import Styles from "../css/main-styles/signup.module.css";
import { useState, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { RiEyeLine, RiEyeCloseLine } from "react-icons/ri";
import UserContext from "../contexts/user";
import Cookies from "universal-cookie";
import { SignUpContext } from "../contexts/user";
import GeneralContext from "../contexts/general";

const LogIn = () => {
  const [passwordVisible, setPasswordVisible] = useState(false);
  const { user, logIn } = useContext(UserContext);
  // These would be used to transfer email and password to the login page after successfull sign up
  const { signUpEmail, setSignUpEmail, signUpPassword, setSignUpPassword } =
    useContext(SignUpContext);
  useEffect(() => {
    console.log(signUpEmail, signUpPassword);
  }, []);
  const { createNotification } = useContext(GeneralContext);

  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };
  const cookies = new Cookies();
  const navigate = useNavigate();

  async function handleSignUp(e) {
    e.preventDefault();

    const loginData = {
      email: e.target["email"].value,
      password: e.target["password"].value,
    };
    let response;
    try {
      response = await fetch("https://centeralmall.onrender.com/users/login", {
        method: "post",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(loginData),
      });

      if (!response.ok) {
        let { error } = await response.json();
        console.log("problem", response, error);
        createNotification(error.message, true);
        return;
      }

      let data = await response.json();
      cookies.set("token", data.token, { path: "/" });
      cookies.set("id", data.user._id, { path: "/" });
      logIn(data.user);

      setSignUpEmail("");
      setSignUpPassword("");
      const name =
        data.user.firstName[0].toUpperCase() + data.user.firstName.substring(1);
      createNotification(`Welcome ${name}`, false);
      navigate("/", { replace: true });
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <>
      <form onSubmit={handleSignUp} name="loginForm" method="get">
        <div className={Styles["form-box"]}>
          <label htmlFor="email">Email</label>
          <input
            type="email"
            name="email"
            id="email"
            defaultValue={signUpEmail && signUpEmail}
          />
        </div>

        <div className={Styles["form-box"]}>
          <label htmlFor="password">Password</label>
          <div className={Styles.password}>
            <input
              type={passwordVisible ? "text" : "password"}
              name="password"
              id="password"
              defaultValue={signUpPassword && signUpPassword}
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
      {/* <div className={Styles.divider}>
        <hr /> <span>OR</span>
        <hr />
      </div>
      <button>LOGIN WITH GOOGLE</button> */}
    </>
  );
};

export default LogIn;
