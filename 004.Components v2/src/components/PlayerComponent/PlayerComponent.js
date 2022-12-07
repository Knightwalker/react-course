const PlayerComponent = ({name, alignment, force}) => {
    return e("div", { className: "PlayerComponent" },
        e("p", {}, name),
        e("p", {}, alignment),
        e("p", {}, force),
    );
};