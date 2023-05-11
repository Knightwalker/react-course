import React, { useEffect, useState } from "react";
import "./Nav.css";

function Nav() {
  const [show, handleShow] = useState(false);

  const transitionNav = () => {
    if (window.scrollY > 100) {
      handleShow(true);
    } else {
      handleShow(false);
    }
  }

  useEffect(() => {
    console.log('> Nav useEffect');
    window.addEventListener("scroll", transitionNav);
  }, []);

  return (
    <div className={`nav ${show && "nav__black"}`}>
      <div className="nav__contents">
        <img className="nav__logo" src={process.env.PUBLIC_URL + "/assets/netflix_logo_transparent.png"} alt="logo"></img>
        <img className="nav__avatar" src={process.env.PUBLIC_URL + "/assets/avatar.png"} alt="avatar"></img>
      </div>
    </div>
  );
}

export default Nav;