import React, { useContext } from 'react';
import { BrowserRouter as Router, Route, Switch, Redirect } from "react-router-dom";
import { LandingPage, HomeScreen, LoginPage, LogoutPage } from "./pages";
import AuthenticationContext from "./contexts/AuthenticationContext";

function App() {
  const user = useContext(AuthenticationContext);
  console.log(user);

  return (
    <div className="App">
      <Router>
        <Switch>
          <Route exact path="/">
            {user.bUserIsAuthenticated ? <Redirect to="/browse" /> : <LandingPage />}
          </Route>  
          <Route exact path="/browse"><HomeScreen /></Route>
          <Route exact path="/login"><LoginPage /></Route>
          <Route exact path="/logout"><LogoutPage /></Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;