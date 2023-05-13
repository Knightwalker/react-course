// Libs
import { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";

// Context
import { AuthContext } from "../../../context/AuthContext";

// Components
import AccordionComponent from "../../../components/landing/AccordionComponent/AccordionComponent";
import LongCardComponent from "../../../components/landing/LongCardComponent/LongCardComponent";

// Data
import longCardComponentData from "../../../data/landing/longCardComponentData.json";
import accordionComponentData from "../../../data/landing/accordionComponentData.json";

// Local imports
import "./LandingPage.css";

const LandingPage = () => {
    const { user } = useContext(AuthContext);
    const navigate = useNavigate();

    useEffect(() => {
        if (user.isLoggedIn) {
            navigate("/browse");
        }
    }, [user.isLoggedIn]);

    return (
        <div className="LandingPage">

            <div className="LandingPage__LongCardComponent-wrapper">
                {longCardComponentData.map((item, idx) => (
                    <LongCardComponent
                        key={item.id}
                        rowIsOdd={idx % 2 === 0}
                        className={item.className}
                        title={item.title}
                        subTitle={item.subTitle}
                        imagePath={item.imagePath}
                        videoPath={item.videoPath}
                        alt={item.alt}
                    />
                ))}
            </div>

            <div className="LandingPage__FAQ-wrapper">
                <p className="LandingPage__FAQ">Frequently Asked Questions</p>
                <AccordionComponent data={accordionComponentData} />
            </div>
        </div>
    );
};

export default LandingPage;