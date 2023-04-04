import React, { useState, useEffect, useRef } from "react";
import "./DropdownButton.css";

/**
 * A custom DropdownButton component that displays a dropdown menu
 * @param {Array} profilesArr contains the username and profile picture
 * @param {Array} accountControlArr contains button name and callbackfn
 * @returns {JSX}
 */
const DropdownButton = ({ profilesArr, accountControlArr }) => {
  const [showMenu, setShowMenu] = useState(false);
  const menuRef = useRef(null);

  const toggleMenu = () => {
    setShowMenu(!showMenu);
  };
  

  const handleOutsideClick = (event) => {
    if (menuRef.current && !menuRef.current.contains(event.target)) {
      setShowMenu(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleOutsideClick);
    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, []);

  return (
    <div className="DropdownButton__container">
      <button className="DropdownButton__btn" onClick={toggleMenu}>
        <div className="DropdownButton__avatar">
          <img
          className="DropdownButton__img"
            src="https://i.pinimg.com/originals/b6/77/cd/b677cd1cde292f261166533d6fe75872.png"
            alt="The user profile avatar"
          />
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="12"
            height="8"
            fill="#fff"
            className="bi bi-triangle-fill avatar-arrow"
            viewBox="0 0 16 16"
          >
            <path
              fillRule="evenodd"
              d="M7.022 1.566a1.13 1.13 0 0 1 1.96 0l6.857 11.667c.457.778-.092 1.767-.98 1.767H1.144c-.889 0-1.437-.99-.98-1.767L7.022 1.566z"
            />
          </svg>
        </div>
      </button>
      {showMenu && (
        <div
          ref={menuRef}
          className={
            "DropdownButton__dropdown-menu" + (showMenu ? " show" : "")
          }
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="12"
            height="8"
            fill="#fff"
            className="bi bi-triangle-fill avatar-arrow-menu"
            viewBox="0 0 16 16"
          >
            <path
              fillRule="evenodd"
              d="M7.022 1.566a1.13 1.13 0 0 1 1.96 0l6.857 11.667c.457.778-.092 1.767-.98 1.767H1.144c-.889 0-1.437-.99-.98-1.767L7.022 1.566z"
            />
          </svg>
          <div className="DropdownButton__profiles">
            {profilesArr.map((profile, index) => (
              <div key={index} className="DropdownButton__profile">
                <img  className="DropdownButton__profile-img" src={profile.profileImg} alt={profile.profileName} />
                <span>{profile.profileName}</span>
              </div>
            ))}
            <a href="https://mytest">Manage Profiles</a>
          </div>

          <div className="DropdownButton__controllers">
            {accountControlArr.map((controller, index) => {
              return (
                <span
                  key={index}
                  className="DropdownButton_controller"
                  onClick={controller.buttonAction}
                >
                  {controller.buttonTitle}
                </span>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};

export default DropdownButton;
