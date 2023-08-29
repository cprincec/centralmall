import { createContext, useState } from "react";
import Cookies from "universal-cookie";

const UserContext = createContext({
  user: null,
  isLoggedIn: false,
  logIn: () => {},
  logOut: () => {},
});

// This would be used to transfer signup info to the login page after successfull sign up
export const SignUpContext = createContext({
  signUpEmail: "",
  signUpPassword: "",
});

export const UserContextProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const cookies = new Cookies();

  function logIn(user) {
    setUser(user);
    setIsLoggedIn(true);
  }

  function logOut() {
    setUser(null);
    setIsLoggedIn(false);
    cookies.remove("id");
    cookies.remove("token");
  }

  const userContextValue = {
    user,
    isLoggedIn,
    logIn,
    logOut,
  };

  return (
    <UserContext.Provider value={userContextValue}>
      {children}
    </UserContext.Provider>
  );
};

export const SignUpContextProvider = ({ children }) => {
  const [signUpEmail, setSignUpEmail] = useState("");
  const [signUpPassword, setSignUpPassword] = useState("");

  const loginInfoContextValue = {
    signUpEmail,
    signUpPassword,
    setSignUpEmail,
    setSignUpPassword,
  };

  return (
    <SignUpContext.Provider value={loginInfoContextValue}>
      {children}
    </SignUpContext.Provider>
  );
};

export default UserContext;
