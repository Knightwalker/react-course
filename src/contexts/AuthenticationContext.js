import React, { createContext, useEffect, useState } from "react";
import { AuthService } from "../configs/firebase";

const AuthenticationContext = createContext();

const AuthenticationContextProvider = (props) => {
  const [objUser, setObjUser] = useState({
    bUserIsAuthenticated: false,
    username: "guest",
  });

  useEffect(() => {
    const firebaseUnsubscribe = AuthService.onAuthStateChanged((user) => {
      if (user) {
        // setObjUser({
        //   bUserIsAuthenticated: true,
        //   username: userAuth.email,
        // });
      } else {
        // do nothing
      }
    });
    return () => {
      firebaseUnsubscribe();
    }
  }, []);

  const value = {
    objUser: objUser
  }

  return (
    <AuthenticationContext.Provider value={value}>
      {props.children}
    </AuthenticationContext.Provider>
  );
}

export { AuthenticationContextProvider };
export default AuthenticationContext;