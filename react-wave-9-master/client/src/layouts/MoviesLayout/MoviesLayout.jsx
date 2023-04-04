import React, { useCallback, useContext, useEffect, useRef, useState } from "react";
import { Outlet, Link, useNavigate } from "react-router-dom";
import SearchButton from "../../components/SearchButton/SearchButton";
import { AuthContext } from "../../contexts/AuthContext";
import "./MoviesLayout.css";
import DropdownButton from "../../components/RegisterForm/DropdownButton/DropdownButton";

const ESC_KEY = 27;
const ENTER_KEY = 13;

const profilesArr = [
  {
    profileName: "Joel",
    profileImg:
      "https://i.pinimg.com/originals/b6/77/cd/b677cd1cde292f261166533d6fe75872.png",
  },
  {
    profileName: "Michael",
    profileImg:
      "https://i.pinimg.com/originals/b6/77/cd/b677cd1cde292f261166533d6fe75872.png",
  },
  {
    profileName: "Jack",
    profileImg:
      "https://i.pinimg.com/originals/b6/77/cd/b677cd1cde292f261166533d6fe75872.png",
  },
];

const MoviesLayout = () => {
  const navigateHook = useNavigate();
  const { user, handleLogoutUser } = useContext(AuthContext);
  const [searchParam, setSearchParam] = useState("");
  const [isSearching, setIsSearching] = useState(false);
  const inputRef = useRef(null);  

  
  const handleLogout = () => {
    handleLogoutUser();
    navigateHook("/");
  };

  const handleShowInput = () => setIsSearching((isSearching) => !isSearching);

  const handleQueryMovies = (searchParam) => {
    console.log(`Query with ${searchParam} was made!`);
  };

  const handleKeyDownEvents = (e) => {
    switch (e.keyCode) {
      case ENTER_KEY: {
        inputRef.current.blur();
        setIsSearching(false);
        setSearchParam("");

        break;
      }
      case ESC_KEY: {
        setSearchParam("");
        break;
      }
      default: {
        break;
      }
    }
  };



  const handleOutsideClick = useCallback((event) => {
    if (inputRef.current && !inputRef.current.contains(event.target) && searchParam === "") {
      setIsSearching(false);
      setSearchParam("");
    }
  }, [searchParam]);

  useEffect(() => {
    if (searchParam === "") {
      return;
    }
    const timer = setTimeout(() => {
      handleQueryMovies(searchParam);
    }, 1000);

    return () => clearInterval(timer);
  }, [searchParam]);


  useEffect(() => {

    document.addEventListener("mousedown", handleOutsideClick);
    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };

  }, [handleOutsideClick]);

  return (
    <div className="MoviesLayout">
      <header className="MoviesLayout__header">
        <nav className="MoviesLayout__nav">
          {user.isLoggedIn ? (
            <>
              <Link to="/">Logo</Link>
              <ul className="MoviesLayout__ul">
                <li>
                  <SearchButton
                    placeholderValue="Titles, people, genres"
                    searchParam={searchParam}
                    setSearchParam={setSearchParam}
                    handleShowInput={handleShowInput}
                    isSearching={isSearching}
                    handleKeyDownEvents={handleKeyDownEvents}
                    inputRef={inputRef}
                  />
                </li>
                <li>Hello {user.email}</li>
                <li>
                  <DropdownButton
                    profilesArr={profilesArr}
                    accountControlArr={[
                      {
                        buttonTitle: "Account",
                        buttonAction: () => console.log("Clicked Account Button"),
                      },
                      {
                        buttonTitle: "Help Centre",
                        buttonAction: () => console.log("Clicked Help Centre"),
                      },
                      {
                        buttonTitle: "Sign out Netflix",
                        buttonAction: handleLogout.bind(this),
                      },
                    ]}
                  />
                </li>
              </ul>
            </>
          ) : (
            <>
              <Link to="/">Logo</Link>
              <ul className="MoviesLayout__ul">
                <li>Sign In</li>
              </ul>
            </>
          )}
        </nav>
      </header>
      <main className="MoviesLayout__main container">
        <Outlet />
      </main>
      <footer className="MoviesLayout__footer">Footer</footer>
    </div>
  );
};

export default MoviesLayout;
