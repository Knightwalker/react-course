import React from "react";
import "./Accordion.css";

function Accordion(props) {
  const { data } = props;

  return (
    <div className="Accordion">
    <h1>Frequently Asked Questions</h1>
    <ul className="Accordion__container">
      {data.map((item, idx) => (
        <li className="Accordion__item" key={idx}>
          <button className="Accordion__btn">{item.question}
            <svg id="thin-x" viewBox="0 0 26 26" class="Accordion__svg-x closed" focusable="true">
              <path d="M10.5 9.3L1.8 0.5 0.5 1.8 9.3 10.5 0.5 19.3 1.8 20.5 10.5 11.8 19.3 20.5 20.5 19.3 11.8 10.5 20.5 1.8 19.3 0.5 10.5 9.3Z"></path>
            </svg>
          </button>
          <div className="Accordion__panel">
            <p>{item.answer}</p>
          </div>
        </li>
      ))}
    </ul>
  </div>
  )
}

export default Accordion;