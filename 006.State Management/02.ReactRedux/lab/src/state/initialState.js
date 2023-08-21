const initialState = {
    user: {
        username: "",
        isLoggedIn: false
    },
    genres: {
        "c143c31a-f7cc-4e2b-8e75-23eb7f76df44": {
            id: "c143c31a-f7cc-4e2b-8e75-23eb7f76df44",
            name: "Fantasy"
        },
        "5429770f-323a-4ecb-bcd0-fe030a8b0d2c": {
            id: "5429770f-323a-4ecb-bcd0-fe030a8b0d2c",
            name: "Horror"
        }
    },
    movies: [
        { id: "a337e17e-d06c-4837-8b4b-33f45cb2524d", title: "Star Wars: Episode 1" },
        { id: "bc5767a3-9bf1-44ad-869d-66a05a4bbd9b", title: "Star Wars: Episode 2" }
    ]
};

export default initialState;