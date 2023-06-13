const template = `
    <div className="PlayerComponent">
        <p>{name}</p>
        <p>{alignment}</p>
        <p>{force}</p>
    </div>
`;

const PlayerComponent = ({name, alignment, force}) => {
    const transpiledCode = Babel.transform(template, { presets: ["react"] }).code;
    return eval(transpiledCode);
};