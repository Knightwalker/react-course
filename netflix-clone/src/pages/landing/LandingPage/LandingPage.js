import React from "react";
import { useNavigate } from "react-router";
import CallToActionForm from "../../../components/CallToActionForm/CallToActionForm";
import LongCard from "../../../components/LongCard/LongCard";
import Accordion from "../../../components/Accordion/Accordion";

// Data
import LongCardsData from "../../../data/LongCardsData.json";
import FaqsData from "../../../data/faqsData.json";
import "./LandingPage.css";

function LandingPage() {
    const navigate = useNavigate();

    const handleSubmit = (data) => {
        navigate("/register");
        // console.log(data.email);
    }

    return (
        <div className="LandingPage">
            <div className="LandingPage__hero">
                <div className="LandingPage__gradient"></div>
                <div className="LandingPage__hero-mid">
                    <h1>Unlimited movies, TV shows, and more.</h1>
                    <h2>Watch anywhere. Cancel at any time.</h2>
                    <h3>Ready to watch? Enter your email to create or restart your membership.</h3>
                    <CallToActionForm onSubmit={handleSubmit} />
                </div>
            </div>

            <div className="LongCard__container">
                {LongCardsData.map((item, idx) => (
                    <LongCard
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

            <div className="LandingPage__accordion-wrapper">
                <h1>Frequently Asked Questions</h1>
                <Accordion data={FaqsData} />
                <h3>Ready to watch? Enter your email to create or restart your membership.</h3>
                <CallToActionForm onSubmit={handleSubmit} />
            </div>
        </div>
    );
}

export default LandingPage;
