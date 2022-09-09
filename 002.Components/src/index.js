const App = () => {
    return React.createElement("div", {}, [
        React.createElement("h1", { className: "text-center" }, "Hello World"),
        React.createElement("h2", { className: "text-center" }, "Choose your character"),
        React.createElement("div", { className: "Player" }, [
            React.createElement("p", {}, "Luke Skywalker"),
            React.createElement("p", {}, "Jedi"),
            React.createElement("p", {}, "Force Push"),
        ]),
        React.createElement("div", { className: "Player" }, [
            React.createElement("p", {}, "Darth Vader"),
            React.createElement("p", {}, "Sith"),
            React.createElement("p", {}, "Force Grip"),
        ]),
        React.createElement(Player, { name: "Obi Wan", alignment: "Jedi", force: "Mind trick" })
    ]);
}

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(React.createElement(App));