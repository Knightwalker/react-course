import React from "react";
import ReactDOM from "react-dom/client";
import PlayerComponent from "./components/PlayerComponent/PlayerComponent";
import "./styles/style.css";
        
const App = () => {
    return (
        <div className="AppComponent">
            <h1 className="text-center">Choose Your Character</h1>
            <PlayerComponent name="Luke Skywalker" alignment="Jedi" force="Force Push" />
            <PlayerComponent name="Darth Vader" alignment="Sith" force="Force Grip" />
            <PlayerComponent name="Obi Wan" alignment="Jedi" force="Mind Trick" />
        </div>
    );
};

const rootNode = document.getElementById("root");
const root = ReactDOM.createRoot(rootNode);
root.render(<App />);