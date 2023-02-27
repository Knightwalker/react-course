import RegisterForm from "../../../components/RegisterForm/RegisterForm";
import "./RegisterPage.css";

const RegisterPage = () => {
    const fields = [
        {
            name: "firstName",
            type: "text",
            value: "",
            placeholder: "First name"
        },
        {
            name: "lastName",
            type: "text",
            value: "",
            placeholder: "Last name"
        },
        {
            name: "email",
            type: "email",
            value: "",
            placeholder: "Email"
        },
        {
            name: "password",
            type: "password",
            value: "",
            placeholder: "Password"
        }
    ]

    return (
        <div className="RegisterPage">
            <RegisterForm fields={fields} />
        </div>
    )
};
export default RegisterPage;
