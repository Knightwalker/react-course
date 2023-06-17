// Libs
import { useEffect, useState, useId } from "react";

// Local imports
import "./CTAComponent.css";

const CTAComponent = ({
    label = "label placeholder",
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
            <p>{label}</p>
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
                        Email address
                    </label>
                </div>

                <button
                    className="CTAComponent-btn"
                    disabled={!isEmailValid}
                >
                    Get Started
                    <i className="CTAComponent__btn-icon bi bi-chevron-right"></i>
                </button>
            </form>
        </div>
    );
};
export default CTAComponent;
