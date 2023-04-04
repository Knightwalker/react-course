// TODO: Improve this component in the future
import "./CTAComponent.css";

const CTAComponent = ({ cbHandleSubmit }) => {
    const handleSubmit = (e) => {
        e.preventDefault();
        const formEl = e.currentTarget;
        const formData = new FormData(formEl);
        const email = formData.get("email");
        if (email === null) {
            return;
        }
        cbHandleSubmit(email);
    }

    return (
        <div className="CTAComponent">
            <p className="CTAComponent__p">Ready to watch? Enter your email to create or restart your membership.</p>
            <form className="CTAComponent__form" onSubmit={handleSubmit}>
                <div className="CTAComponent__input-container">
                    <input 
                        className="CTAComponent__input" 
                        name="email" 
                        type="text" 
                        required={true} 
                        autoComplete="username"
                    />
                    <label className="CTAComponent__label">Email address</label>
                </div>
                <button className="CTAComponent__btn" type="submit">
                    <span className="CTAComponent__btn-text">Get Started</span>
                    <span className="chevron-right-arrow">
                        <svg viewBox="0 0 6 12" xmlns="http://www.w3.org/2000/svg">
                            <desc>chevron</desc>
                            <path d="M.61 1.312l.78-.624L5.64 6l-4.25 5.312-.78-.624L4.36 6z" fill="#fafafa" fillRule="evenodd"></path>
                        </svg>
                    </span>
                </button>
            </form>
        </div>
    );
}

export default CTAComponent;