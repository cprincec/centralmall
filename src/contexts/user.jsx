import { createContext, useState } from "react";

const UserContext = createContext({
  user: null,
  isLoggedIn: false,
  logIn: () => {},
  logOut: () => {},
});

export const UserContextProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  function logIn(user) {
    setUser(user);
    setIsLoggedIn(true);
    console.log(user);
  }

  function logOut() {
    setUser(null);
    setIsLoggedIn(false);
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

export default UserContext;
