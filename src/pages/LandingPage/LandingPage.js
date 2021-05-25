import React from "react";

import LandingPageLayout from "../../layouts/LandingPageLayout";
import LongCard from "../../components/LongCard/LongCard";
import Accordion from "../../components/Accordion/Accordion";
import CallToActionForm from "../../components/CallToActionForm/CallToActionForm";

import LongCardsData from "./LongCardsData.json";
import FaqsData from "./FaqsData.json";

import "./LandingPage.css";

function LandingPage() {
  return (
    <LandingPageLayout>
      <div className="LandingPage">
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

        <Accordion data={FaqsData} />
        <CallToActionForm />

      </div>
    </LandingPageLayout>
  );
}

export default LandingPage;