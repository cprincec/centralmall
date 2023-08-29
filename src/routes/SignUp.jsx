import Styles from "../css/main-styles/signup.module.css";
import { useState, useContext } from "react";
import { RiEyeLine, RiEyeCloseLine } from "react-icons/ri";
import UserContext, { SignUpContext } from "../contexts/user";
import { useNavigate, Link } from "react-router-dom";
import Notification from "../components/Notification";
import GeneralContext from "../contexts/general";

const SignUp = () => {
  const [passwordVisible, setPasswordVisible] = useState(false);
  const { createNotification } = useContext(GeneralContext);
  const { setSignUpEmail, setSignUpPassword } = useContext(SignUpContext);

  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  // const { user, logIn } = useContext(UserContext);
  const navigate = useNavigate();

  async function handleSignUp(e) {
    e.preventDefault();

    const signUpData = {
      firstName: e.target["firstName"].value,
      lastName: e.target["lastName"].value,
      email: e.target["email"].value,
      password: e.target["password"].value,
      oAuth: "0",
    };

    const response = await fetch("https://centeralmall.onrender.com/users", {
      method: "POST",
      body: JSON.stringify(signUpData),
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (response.ok) {
      setSignUpEmail(signUpData.email);
      setSignUpPassword(signUpData.password);
      createNotification("Account created successfully!", false);
      navigate("/signup-login/login", { replace: true });
    } else {
      let { error } = await response.json();
      createNotification(error.message, true);
    }
  }

  return (
    <>
      <form onSubmit={handleSignUp} name="signupForm" method="get">
        <div className={Styles["form-box"]}>
          <label htmlFor="firstname">Firstname</label>
          <input type="text" name="firstName" id="firstname" required />
        </div>
        <div className={Styles["form-box"]}>
          <label htmlFor="">Lastname</label>
          <input type="text" name="lastName" id="lastname" required />
        </div>
        <div className={Styles["form-box"]}>
          <label htmlFor="email">Email</label>
          <input type="email" name="email" id="email" required />
        </div>

        <div className={Styles["form-box"]}>
          <label htmlFor="password">Password</label>
          <div className={Styles.password}>
            <input
              type={passwordVisible ? "text" : "password"}
              name="password"
              id="password"
              required
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
          SIGN UP
        </button>
      </form>

      {/* <div className={Styles.divider}>
        <hr /> <span>OR</span>
        <hr />
      </div>
      <Link to={"https://centeralmall.onrender.com/auth/google"}>
        <button
        >
          LOG IN WITH GOOGLE
        </button>
      </Link> */}
    </>
  );
};

export default SignUp;
