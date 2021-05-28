import React, { useEffect } from 'react';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { auth } from './configs/firebase';
import { LandingPage, HomeScreen, LoginPage } from "./pages";

function App() {
  const user = null;

  useEffect(() => {
    auth.onAuthStateChanged((userAuth) => {
      if (userAuth) {
        // Logged In
        console.log(userAuth);
      } else {
        // Logged Out
        console.log(userAuth);
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
        </Switch>
      </Router>
    </div>
  );
}

export default App;