// Libs
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

// State Management, Context
import { userLoggedOut } from "../../../db/slices/authSlice";

const LogoutPage = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    useEffect(() => {
        dispatch(userLoggedOut());
        
        const id = setTimeout(() => {
            navigate("/");
        }, 3000);

        return () => {
            window.clearTimeout(id);
        };
    }, []);
    
    return (
        <div>
            Welcome to LogoutPage
            TODO: Leaving so soon? You will be logged out in 3 seconds.
        </div>
    );
};

export default LogoutPage;