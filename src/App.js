import React, { useContext } from 'react';
import { BrowserRouter as Router, Route, Switch, Redirect } from "react-router-dom";
import { LandingPage, HomePage, LoginPage, LogoutPage } from "./pages";
import AuthenticationContext from "./contexts/AuthenticationContext";

function App() {
  const { objUser } = useContext(AuthenticationContext);

  return (
    <Router>
      <Switch>
        <Route exact path="/">{objUser.bUserIsAuthenticated ? <Redirect to="/browse" /> : <LandingPage />}</Route>
        <Route exact path="/browse">{!objUser.bUserIsAuthenticated ? <Redirect to="/" /> : <HomePage />}</Route>
        <Route exact path="/login"><LoginPage /></Route>
        <Route exact path="/logout"><LogoutPage /></Route>
      </Switch>
    </Router>
  );
}

export default App;