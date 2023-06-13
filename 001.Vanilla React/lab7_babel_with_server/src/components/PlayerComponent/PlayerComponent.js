const PlayerComponent = ({ name, alignment, force }) => {
    return (
        <div className="PlayerComponent">
            <p>{name}</p>
            <p>{alignment}</p>
            <p>{force}</p>
        </div>
    )
};