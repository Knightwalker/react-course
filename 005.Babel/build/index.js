var rootTree = React.createElement("div", {}, [React.createElement("h1", { className: "text-center" }, "Choose Your Character"), React.createElement(PlayerComponent, { name: "Luke Skywalker", alignment: "Jedi", force: "Force Push" }), React.createElement(PlayerComponent, { name: "Darth Vader", alignment: "Sith", force: "Force Grip" }), React.createElement(PlayerComponent, { name: "Obi Wan", alignment: "Jedi", force: "Mind Trick" })]);

var rootNode = document.getElementById("root");
var root = ReactDOM.createRoot(rootNode);
root.render(rootTree);