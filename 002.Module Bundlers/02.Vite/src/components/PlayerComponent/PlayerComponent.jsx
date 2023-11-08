import React from "react";
import "./PlayerComponent.scss";

const PlayerComponent = (props) => {
    return (
        <div className="PlayerComponent">
            <p>{props.name}</p>
            <p>{props.alignment}</p>
            <p>{props.force}</p>
        </div>
    );
}

export default PlayerComponent;