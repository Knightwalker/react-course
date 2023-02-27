import { createContext, useEffect, useState } from "react";

const AppContext = createContext({});

const AppContextProvider = ({ children }) => {
    const [user, setUser] = useState({
        username: "",
        email: "",
        isLoggedIn: false
    });

    const handleSetUser = (username, email) => {
        const user = {
            username: username,
            email: email,
            isLoggedIn: true
        }

        setUser(user);

        localStorage.setItem("NetflixClone", JSON.stringify(user));
    }

    useEffect(() => {
        const user = JSON.parse(localStorage.getItem("NetflixClone"));

        if (user === null) {
            return;
        }

        setUser(user);

    }, []);

    return (
        <AppContext.Provider value={{
            user: user,
            setUser: setUser,
            handleSetUser: handleSetUser
        }}>
            {children}
        </AppContext.Provider>
    )
};

export default AppContextProvider;
export { AppContext }
