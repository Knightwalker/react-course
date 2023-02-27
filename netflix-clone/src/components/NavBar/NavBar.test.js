import { fireEvent, render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import NavBar from "./NavBar";
import { BrowserRouter } from "react-router-dom";
import { POSITION } from "../../enums";

test("renders NavBar component", () => {
    render(<NavBar />, { wrapper: BrowserRouter });
});

test("should render button with specific name", () => {
    render(
        <NavBar
            navItemsArray={[
                { label: "navButton", position: POSITION.LEFT, url: "/button" },
            ]}
        />,
        {
            wrapper: BrowserRouter,
        }
    );
    const buttonElement = screen.getByText(/navButton/i);
    expect(buttonElement).toBeInTheDocument();
});

test("should change pathname when buttton is clicked", () => {
    render(
        <NavBar
            navItemsArray={[
                { label: "navButton", position: POSITION.LEFT, url: "/button" },
            ]}
        />,
        {
            wrapper: BrowserRouter,
        }
    );
    const buttonElement = screen.getByText(/navButton/i);
    fireEvent.click(buttonElement);
    expect(window.location.pathname).toEqual("/button");
});
