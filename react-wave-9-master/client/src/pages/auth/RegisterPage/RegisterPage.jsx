import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import RegisterForm from "../../../components/RegisterForm/RegisterForm";
import { useRegister } from "../../../services/AuthService";
import "./RegisterPage.css";

const RegisterPage = () => {
    const [ makeRequestRegister, cancelRequestRegister] = useRegister();
    const navigate = useNavigate();

    const fields = [
        {
            name: "firstName",
            type: "text",
            placeholder: "First Name",
        },
        {
            name: "lastName",
            type: "text",
            placeholder: "Last Name",
        },
        {
            name: "email",
            type: "email",
            placeholder: "Email",
        },
        {
            name: "password",
            type: "password",
            placeholder: "Password",
        },
    ];

    const handleSubmit = async ({firstName, lastName, email,password}) => {
        try {
            await makeRequestRegister(firstName, lastName, email, password);
        } catch (error) {
            if (error.message === "canceled") {
                return;
            }
        }

        // authentication
        navigate("/auth/login");
    };

    useEffect(() => {
        return () => {
            cancelRequestRegister();
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    return (
        <div className="RegisterPage">
            <div className="RegisterPage__form-wrapper">
                <h1 className="RegisterPage__form-wrapper-label">Register</h1>
                <RegisterForm fields={fields} handleSubmit={handleSubmit} />
            </div>
        </div>
    );
};

export default RegisterPage;
