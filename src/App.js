import React, { useEffect } from 'react';
import { BrowserRouter as Router, Route, Switch, Redirect} from "react-router-dom";
import { auth } from './configs/firebase';
import { useDispatch, useSelector } from 'react-redux';
import { login, logout, selectUser } from "./features/userSlice";

import { LandingPage, HomeScreen, LoginPage, LogoutPage } from "./pages";

function App() {
  const user = useSelector(selectUser);
  const dispatch = useDispatch();

  console.log(user);

  useEffect(() => {
    auth.onAuthStateChanged((userAuth) => {
      if (userAuth) {
        dispatch(login({
          uid: userAuth.uid,
          email: userAuth.email,
          username: userAuth.displayName
        }));
      } else {
        dispatch(logout);
      }
    });
  }, []);

  return (
    <div className="App">
      <Router>
        <Switch>
          <Route exact path="/"><LandingPage /></Route>  
          <Route exact path="/browse"><HomeScreen /></Route>
          <Route exact path="/login"><LoginPage /></Route>
          <Route exact path="/logout"><LogoutPage /></Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;