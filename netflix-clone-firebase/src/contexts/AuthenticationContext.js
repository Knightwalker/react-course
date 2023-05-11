import React, { createContext, useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { AuthService } from "../configs/firebase";

const AuthenticationContext = createContext();

const AuthenticationContextProvider = (props) => {
  const history = useHistory();
  const [objUser, setObjUser] = useState(props.objUser);
  const [didLoad, setDidLoad] = useState(false);
  
  useEffect(() => {
    const firebaseUnsubscribe = AuthService.onAuthStateChanged((user) => {
      if (user) {
        setObjUser({
          bUserIsAuthenticated: true,
          username: user.email,
        });
      } else {
        setObjUser({
          bUserIsAuthenticated: false,
          username: "guest",
        });
      }
      setDidLoad(true);
    });
    return () => {
      firebaseUnsubscribe();
    }
  }, []);

  const value = {
    objUser: objUser
  }

  return (
    <AuthenticationContext.Provider 
      value={value}
    >
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