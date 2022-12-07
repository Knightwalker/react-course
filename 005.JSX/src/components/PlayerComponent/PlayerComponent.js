const template = `
    <div className="PlayerComponent">
        <p>{name}</p>
        <p>{alignment}</p>
        <p>{force}</p>
    </div>
`;

const PlayerComponent = ({name, alignment, force}) => {
    return(
        eval(Babel.transform(template, { presets: ['es2017', 'react'] }).code)
    );
};