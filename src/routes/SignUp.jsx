import Styles from "../css/main-styles/signup.module.css";
import { useState, useContext } from "react";
import { RiEyeLine, RiEyeCloseLine } from "react-icons/ri";
import UserContext from "../contexts/user";

const SignUp = () => {
  const [passwordVisible, setPasswordVisible] = useState(false);

  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  const { user, logIn } = useContext(UserContext);

  function handleSignUp(e) {
    e.preventDefault();
    const data = {
      firstName: e.target["firstName"].value,
      lastName: e.target["lastName"].value,
      email: e.target["email"].value,
      password: e.target["password"].value,
    };

    const loginData = {
      email: e.target["email"].value,
      password: e.target["password"].value,
    };

    fetch("https://centeralmall.onrender.com/users", {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => {
        for (var pair of response.headers.entries()) {
          // accessing the entries
          console.log(pair);
        }

        return response.json();
      })
      .then((data) => {
        console.log(data);
        fetch("https://centeralmall.onrender.com/auth/login", {
          method: "post",
          body: JSON.stringify(loginData),
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
          withCredentials: true,
        })
          .then((response) => {
            for (var pair of response.headers.entries()) {
              // accessing the entries
              console.log(pair);
            }
            return response.json();
          })
          .then((data) => {
            logIn(data);
            console.log(user, data);
          })
          .catch((error) => console.log("user data error", error));
      })
      .catch((error) => console.log(error));
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
      <div className={Styles.divider}>
        <hr /> <span>OR</span>
        <hr />
      </div>
      <button>SIGN UP WITH GOOGLE</button>
    </>
  );
};

export default SignUp;
