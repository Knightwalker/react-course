import React, { useState } from "react";
import "./Accordion.css";

function Accordion(props) {
  const { data } = props;
  const [ bItemsAreToggled, setItemsAreToggled ] = useState(() => {
    let obj = {}
    for (let i = 0; i < data.length; i++) {
      let key = data[i].id;
      console.log(key);
      obj[key] = false; 
      console.log(data[i])
    }
    return obj;
  });

  const toggleItem = (id) => {
    setItemsAreToggled((prevState) => {
      let currentChange = !prevState[id];
      let newState = { ...prevState }
      for (let key in newState) { newState[key] = false; }
      newState[id] = currentChange;
      return newState;
    })
  }

  return (
    <div className="Accordion">
    <h1>Frequently Asked Questions</h1>
    <ul className="Accordion__container">
      {data.map((item) => (
        <li className="Accordion__item" key={item.id}>
          <button 
            className="Accordion__btn"
            onClick={() => toggleItem(item.id)}
          >
            {item.question}
            <svg viewBox="0 0 26 26" className={`Accordion__close-icon ${bItemsAreToggled[item.id] === true ? "open" : "closed"}`}>
              <path d="M10.5 9.3L1.8 0.5 0.5 1.8 9.3 10.5 0.5 19.3 1.8 20.5 10.5 11.8 19.3 20.5 20.5 19.3 11.8 10.5 20.5 1.8 19.3 0.5 10.5 9.3Z"></path>
            </svg>
          </button>
          <div className={`Accordion__panel ${bItemsAreToggled[item.id] === true ? "open" : "closed"}`}>
            <p>{item.answer}</p>
          </div>
        </li>
      ))}
    </ul>
  </div>
  )
}

export default Accordion;