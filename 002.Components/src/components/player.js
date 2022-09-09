const Player = (props) => {
    return React.createElement("div", { className: "Player" }, [
        React.createElement("p", {}, props.name),
        React.createElement("p", {}, props.alignment),
        React.createElement("p", {}, props.force),
    ]);
}