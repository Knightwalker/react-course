import React from "react";

import BasicLayout from "../../layouts/BasicLayout";
import LongCard from "../../components/LongCard/LongCard";
import LongCardsData from "../../pages/LandingPage/LongCardsData.json";

import "./LandingPage.css";

function LandingPage() {
  return (
    <BasicLayout>
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
      </div>
    </BasicLayout>
  );
}

export default LandingPage;