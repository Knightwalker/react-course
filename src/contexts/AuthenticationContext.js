import React, { createContext, useEffect, useState } from "react";
import { AuthService } from "../configs/firebase";

const AuthenticationContext = createContext();

const AuthenticationContextProvider = (props) => {
  const [objUser, setObjUser] = useState(props.objUser);
  const [didLoad, setDidLoad] = useState(false);
  
  const value = {
    objUser: objUser
  }

  useEffect(() => {
    const firebaseUnsubscribe = AuthService.onAuthStateChanged((user) => {
      if (user) {
        setObjUser({
          bUserIsAuthenticated: true,
          username: user.email,
        });
      } else {
        // do nothing
      }
      setDidLoad(true);
    });
    return () => {
      firebaseUnsubscribe();
    }
  }, []);

  return (
    <AuthenticationContext.Provider value={value}>
      {didLoad ? props.children : null}
    </AuthenticationContext.Provider>
  );
}

AuthenticationContextProvider.defaultProps = {
  objUser: {
    bUserIsAuthenticated: false,
    username: "guest",
  }
};

export { AuthenticationContextProvider };
export default AuthenticationContext;