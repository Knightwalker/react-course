var PlayerComponent = function PlayerComponent(props) {
    return React.createElement(
        "div",
        { className: "PlayerComponent" },
        React.createElement(
            "p",
            null,
            props.name
        ),
        React.createElement(
            "p",
            null,
            props.alignment
        ),
        React.createElement(
            "p",
            null,
            props.force
        )
    );
};