import React from "react";

import BasicLayout from "../../layouts/BasicLayout";
import Jumbotron from "../../components/jumbotron/jumbotron";
import jumboData from "../../components/jumbotron/jumboData.json";

import "./LandingPage.css";

function LandingPage() {
  return (
    <BasicLayout>
      <div class="LandingPage">
        <div className="Jumbotron__container">
          {jumboData.map((item, idx) => (
            <Jumbotron
              key={item.id}
              rowIsOdd={idx % 2 === 0}
              title={item.title}
              subTitle={item.subTitle}
              imagePath={item.imagePath}
              alt={item.alt}
            />
          ))}
        </div>
      </div>
    </BasicLayout>
  );
}

export default LandingPage;