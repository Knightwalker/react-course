// Libs
import { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";

// Context
import { AuthContext } from "../../../context/AuthContext";

const LogoutPage = () => {
    const { handleLogoutUser } = useContext(AuthContext);
    const navigate = useNavigate();

    useEffect(() => {
        handleLogoutUser();
        
        const id = setTimeout(() => {
            navigate("/");
        }, 2000);

        return () => {
            window.clearTimeout(id);
        }
    }, []);
    
    return (
        <div>
            Welcome to LogoutPage
            TODO: Leaving so soon? You will be logged out in 30 seconds.
        </div>
    )
}

export default LogoutPage;