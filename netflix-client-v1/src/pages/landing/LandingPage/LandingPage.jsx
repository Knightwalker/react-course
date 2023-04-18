// Components
import AccordionComponent from "../../../components/landing/AccordionComponent/AccordionComponent";

// Data
import accordionComponentData from "../../../data/landing/accordionComponentData.json";

// Local imports
import "./LandingPage.css";

const LandingPage = () => {

    return (
        <div className="LandingPage text-center">
            Hello From Landing Page

            <div className="LandingPage__FAQ-wrapper">
                <p className="LandingPage__FAQ">Frequently Asked Questions</p>
                <AccordionComponent data={accordionComponentData} />
            </div>
        </div>
    )
}

export default LandingPage;