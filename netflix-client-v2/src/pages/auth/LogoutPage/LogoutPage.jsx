// Libs
import { useContext, useEffect } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

// State Management, Context
import { AuthContext } from "../../../db/AuthContextProvider";

const LogoutPage = () => {
    const { handleLogoutUser } = useContext(AuthContext);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    useEffect(() => {
        handleLogoutUser();
        
        const id = setTimeout(() => {
            navigate("/");
        }, 2000);

        return () => {
            window.clearTimeout(id);
        };
    }, []);
    
    return (
        <div>
            Welcome to LogoutPage
            TODO: Leaving so soon? You will be logged out in 30 seconds.
        </div>
    );
};

export default LogoutPage;