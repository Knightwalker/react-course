const App = () => {
    return React.createElement("div", {}, [
        React.createElement("h1", { className: "text-center" }, "Hello World"),
        React.createElement("h2", { className: "text-center" }, "Choose your character"),
        React.createElement("div", { className: "PlayerComponent" }, [
            React.createElement("p", {}, "Luke Skywalker"),
            React.createElement("p", {}, "Jedi"),
            React.createElement("p", {}, "Force Push"),
        ]),
        React.createElement("div", { className: "PlayerComponent" }, [
            React.createElement("p", {}, "Darth Vader"),
            React.createElement("p", {}, "Sith"),
            React.createElement("p", {}, "Force Grip"),
        ]),
        React.createElement("div", { className: "PlayerComponent" }, [
            React.createElement("p", {}, "Obi Wan"),
            React.createElement("p", {}, "Jedi"),
            React.createElement("p", {}, "Mind Trick"),
        ])
    ]);
}

const rootNode = document.getElementById("root");
const root = ReactDOM.createRoot(rootNode);
root.render(React.createElement(App));