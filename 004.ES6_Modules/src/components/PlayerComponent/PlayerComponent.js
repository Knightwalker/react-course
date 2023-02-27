const PlayerComponent = ({name, alignment, force}) => {
    return React.createElement("div", { className: "PlayerComponent" },
        React.createElement("p", {}, name),
        React.createElement("p", {}, alignment),
        React.createElement("p", {}, force),
    );
};

export default PlayerComponent;