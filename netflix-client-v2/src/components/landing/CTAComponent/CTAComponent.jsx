// Libs
import { useEffect, useState, useId } from "react";

// Local imports
import "./CTAComponent.css";

const CTAComponent = ({
    label = "heading 3 placeholder",
    emailLabel = "Email address",
    btnLabel = "Get Started",
    cbHandleSubmit
}) => {
    const uid = useId();
    const [classNames, setClassNames] = useState({
        "CTAComponent__form-input": ["CTAComponent__form-input"]
    });
    const [email, setEmail] = useState("");
    const [isEmailDirty, setIsEmailDirty] = useState(false);
    const [isEmailValid, setIsEmailValid] = useState(false);

    const handleChangeEmail = (event) => {
        if (!isEmailDirty) {
            setIsEmailDirty(true);
        }
        const newEmail = event.target.value;
        setEmail(newEmail);
    };

    useEffect(() => {
        if (!isEmailDirty) {
            return;
        }
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            setClassNames((prevClassNames) => {
                return {
                    ...prevClassNames,
                    "CTAComponent__form-input": ["CTAComponent__form-input", "error"]
                };
            });
            setIsEmailValid(false);
            return;
        }

        setIsEmailValid(true);
        setClassNames((prevClassNames) => {
            return {
                ...prevClassNames,
                "CTAComponent__form-input": ["CTAComponent__form-input", "success"]
            };
        });
    }, [email]);

    const handleSubmit = (event) => {
        event.preventDefault();
        cbHandleSubmit(email);
    };

    return (
        <div className="CTAComponent">
            <h3>{label}</h3>
            <form
                className="CTAComponent__form"
                onSubmit={handleSubmit}
            >
                <div
                    className="CTAComponent__form-control"
                >
                    <input
                        id={`${uid}-email`}
                        className={classNames["CTAComponent__form-input"].join(" ")}
                        name="email"
                        type="text"
                        value={email}
                        onChange={handleChangeEmail}
                        required={true}
                        // autoComplete="username"
                    />
                    <label
                        htmlFor={`${uid}-email`}
                        className="CTAComponent__form-label"
                    >
                        {emailLabel}
                    </label>
                </div>

                <button
                    className="CTAComponent__btn"
                    disabled={!isEmailValid}
                >
                    {btnLabel}
                    <i className="CTAComponent__btn-icon bi bi-chevron-right"></i>
                </button>
            </form>
        </div>
    );
};
export default CTAComponent;
