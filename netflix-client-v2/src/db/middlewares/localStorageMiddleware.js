const loadState = () => {
    const persistedState = JSON.parse(localStorage.getItem("NetflixClone"));

    if (persistedState === null) {
        return;
    }

    return persistedState;
};

const saveState = (state) => {
    localStorage.setItem("NetflixClone", JSON.stringify(state));
}

const localStorageMiddleware = (store) => {
    return (next) => {
        return (action) => {
            const result = next(action);
            saveState(store.getState());
            return result;
        };
    };
}

export default localStorageMiddleware;
export { loadState }