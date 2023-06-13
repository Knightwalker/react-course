const PlayerComponent = (props) => {
    return React.createElement("div", { className: "PlayerComponent" },
        React.createElement("p", {}, props.name),
        React.createElement("p", {}, props.alignment),
        React.createElement("p", {}, props.force),
    );
};