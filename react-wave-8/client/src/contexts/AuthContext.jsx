import { createContext, useState, useEffect } from "react";

const AuthContext = createContext({});

const initialUser = {
    email: "",
    token: "",
    isLoggedIn: false
}

const AuthContextProvider = ({ children }) => {
    const [user, setUser] = useState(initialUser);

    const handleSetUser = (email, token) => {
        const user = {
            email: email,
            token: token,
            isLoggedIn: true
        }
        setUser(user);

        localStorage.setItem("NetflixClone", JSON.stringify(user));
    }

    const handleLogoutUser = () => {
        setUser(initialUser);
        localStorage.clear("NetflixClone");
    }

    useEffect(() => {
        const user = JSON.parse(localStorage.getItem("NetflixClone"));

        if (user === null) {
            return;
        }

        setUser(user);
    }, []);

    return (
        <AuthContext.Provider value={{
            user: user,
            handleSetUser: handleSetUser,
            handleLogoutUser: handleLogoutUser
        }}>
            {children}
        </AuthContext.Provider>
    )
}

export default AuthContextProvider;
export { AuthContext }


