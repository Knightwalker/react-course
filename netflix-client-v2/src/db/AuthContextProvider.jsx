// Libs
import { createContext, useEffect } from "react";
import { useDispatch } from "react-redux";

// State Management
import { userLoggedIn, userLoggedOut } from "./authSlice";

const AuthContext = createContext(null);

const AuthContextProvider = ({ children }) => {
    const dispatch = useDispatch();

    const handleSetUser = (email, token) => {
        const user = {
            email: email,
            token: token,
            isLoggedIn: true
        };
        dispatch(userLoggedIn(user));
        localStorage.setItem("NetflixClone", JSON.stringify(user));
    };

    const handleLogoutUser = () => {
        dispatch(userLoggedOut());
        localStorage.clear("NetflixClone");
    };

    useEffect(() => {
        const user = JSON.parse(localStorage.getItem("NetflixClone"));

        if (user === null) {
            return;
        }

        dispatch(userLoggedIn(user));
    }, []);

    return (
        <AuthContext.Provider value={{
            handleSetUser: handleSetUser, 
            handleLogoutUser: handleLogoutUser
        }}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthContextProvider;
export { AuthContext };