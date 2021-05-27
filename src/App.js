import React from 'react';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { LandingPage, HomeScreen, LoginPage } from "./pages";

function App() {
  const user = null;

  return (
    <div className="App">
      <Router>
        <Switch>
          {!user ? (
            <LoginPage />
          ) : (
            <>
              <Route exact path="/"><LandingPage /></Route>
              <Route exact path="/browse"><HomeScreen /></Route>
            </>
          )}
        </Switch>
      </Router>
    </div>
  );
}

export default App;