const wait = (ms: number): Promise<undefined> => {
    return new Promise((resolve) => {
        setTimeout(resolve, ms);
    });
};

export {
    wait
};