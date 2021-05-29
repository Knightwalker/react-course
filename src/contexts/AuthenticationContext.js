import React, { createContext, useEffect, useState } from "react";
import { AuthService } from "../configs/firebase";

const AuthenticationContext = createContext();

const AuthenticationContextProvider = (props) => {
  const [objUser, setObjUser] = useState({
    bUserIsAuthenticated: false,
    username: "guest",
  });

  useEffect(() => {
    AuthService.onAuthStateChanged((userAuth) => {
      if (userAuth) {
        setObjUser({
          bUserIsAuthenticated: true,
          username: userAuth.email,
        });
      } else {
        // do nothing
      }
    });
  }, []);

  return (
    <AuthenticationContext.Provider
      value={objUser}
    >
      {props.children}
    </AuthenticationContext.Provider>
  );
}

export { AuthenticationContextProvider };
export default AuthenticationContext;