import React from 'react';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { LandingPage, HomeScreen } from "./pages";

function App() {
  return (
    <div className="App">
      <Router>
        <Switch>
          <Route exact path="/"><LandingPage /></Route>
          <Route exact path="/browse"><HomeScreen /></Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;