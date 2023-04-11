const fibb = (n) => {
    // console.log("calc");
    if (n <= 1) {
        return 1;
    }

    return fibb(n - 1) + fibb(n - 2);
}

export default fibb;
