import React from "react";
import ReactDOM from "react-dom/client";
import MovieCardComponent from "./components/MovieCardComponent/MovieCardComponent";
import "./styles/style.css";
        
const App = () => {
    return (
        <div className="AppComponent">
            <h1 className="text-center">My Videos</h1>
            <div className="AppComponent__MovieCardComponentWrapper">
                <MovieCardComponent name="Fast and Furious 39" year="Jedi" rating="100%" />
                <MovieCardComponent name="Darth Vader" year="Sith" rating="69%" />
                <MovieCardComponent name="Titanic" year="1997" rating="88%" />
            </div>
        </div>
    );
};

const rootNode = document.getElementById("root");
const root = ReactDOM.createRoot(rootNode);
root.render(<App />);