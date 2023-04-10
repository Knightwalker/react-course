import { createContext, useState, useEffect } from "react";

const AuthContext = createContext(null);

const initialUser = {
    email: "",
    isLoggedin: false
};

const AuthContextProvider = ({ children }) => {
    const [user, setUser] = useState(initialUser);

    const handleSetUser = (email) => {
        const user = {
            email: email,
            isLoggedin: true
        }
        localStorage.setItem("NetflixClone", JSON.stringify(user));
        setUser(user);
    };

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