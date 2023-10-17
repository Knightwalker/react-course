// Libs
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

// State Management
import { useSelectUser } from "@/db/slices/authSlice";

// Components
import AccordionComponent from "@components/landing/AccordionComponent/AccordionComponent";
import LongCardComponent from "@components/landing/LongCardComponent/LongCardComponent";

// Data
import longCardComponentData from "@/data/landing/longCardComponentData.json";
import accordionComponentData from "@/data/landing/accordionComponentData.json";

// Local imports
import "./LandingPage.css";

const LandingPage = (): JSX.Element => {
    const user = useSelectUser();
    const navigate = useNavigate();

    useEffect(() => {
        if (user.isLoggedIn) {
            navigate("/browse");
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [user.isLoggedIn]);

    return (
        <div className="LandingPage">
            <div className="LandingPage__LongCardComponent-wrapper">
                {longCardComponentData.map((item, idx) => (
                    <LongCardComponent
                        key={item.id}
                        cardType={item.cardType}
                        rowIsEven={idx % 2 === 0}
                        title={item.title}
                        subTitle={item.subTitle}
                        imagePath={item.imagePath}
                        videoPath={item.videoPath}
                        alt={item.alt}
                    />
                ))}
            </div>

            <div className="LandingPage__AccordionComponent-wrapper">
                <p className="LandingPage__FAQ">Frequently Asked Questions</p>
                <AccordionComponent data={accordionComponentData} />
            </div>
        </div>
    );
};

export default LandingPage;