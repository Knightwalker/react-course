import React from "react";

import LandingPageLayout from "../../layouts/LandingPageLayout";
import LongCard from "../../components/LongCard/LongCard";
import Accordion from "../../components/Accordion/Accordion";
import CallToActionForm from "../../components/CallToActionForm/CallToActionForm";

import LongCardsData from "./LongCardsData.json";
import FaqsData from "./FaqsData.json";

import "./LandingPage.css";

const handleSubmit = (data) => {
  console.log(data.email);
}

function LandingPage() {
  return (
    <LandingPageLayout>
      <div className="LandingPage">

        <div className="LandingPage__hero">
          <div className="LandingPage__gradient"></div>
          <div className="LandingPage__nav">
            <img className="LandingPage__nav-logo" src="/assets/netflix_logo_transparent.png" alt="logo"></img>
            <button className="LandingPage__nav-btn">Sign In</button>
          </div>


          <div className="LandingPage__hero-text">
            <div>
              <h1>Unlimited movies, TV shows, and more.</h1>
              <h2>Watch anywhere. Cancel at any time.</h2>
              <h3>Ready to watch? Enter your email to create or restart your membership.</h3>
              <CallToActionForm onSubmit={handleSubmit} />
            </div>
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
    </LandingPageLayout>
  );
}

export default LandingPage;