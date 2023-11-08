import React from "react";
import ReactDOM from "react-dom/client";
import MovieCardComponent from "./components/MovieCardComponent/MovieCardComponent";
import "./styles/style.css";

const App = () => {
    return (
        <div className="AppComponent">
            <h1 className="text-center">Movies App</h1>
            <div className="AppComponent__MovieCardComponentWrapper">
                <MovieCardComponent
                    name="Fast and Furious 39"
                    year="2039"
                    rating="100%"
                    imgPath="/assets/ajVvXYR_460s.jpg"
                />
                <MovieCardComponent
                    name="Darth Vader"
                    year="2039"
                    rating="69%"
                    imgPath="/assets/ajVvXYR_460s.jpg"
                />
                <MovieCardComponent
                    name="Titanic"
                    year="1997"
                    rating="88%"
                    imgPath="/assets/ajVvXYR_460s.jpg"
                />
            </div>
        </div>
    );
};

const rootNode = document.getElementById("root");
const root = ReactDOM.createRoot(rootNode);
root.render(<App />);