
// Libs
import { useState } from "react";

// Local imports
import "./AccordionComponent.css";

// Local types
type TAccordionComponentData = {
    id: number;
    question: string;
    answer: string;
}

type TAccordionComponentProps = {
    data: TAccordionComponentData[]
}

type TItemsAreToggled = {
    [id:string]: boolean
}

const AccordionComponent = ({ data }: TAccordionComponentProps): JSX.Element => {
    const [bItemsAreToggled, setItemsAreToggled] = useState<TItemsAreToggled>(() => {
        const obj: TItemsAreToggled = {};
        const dataLength = data.length;
        for (let i = 0; i < dataLength; ++i) {
            const id = data[i].id.toString();
            obj[id] = false;
        }
        return obj;
    });

    const toggleItem = (id: number): void => {
        setItemsAreToggled((prevState) => {
            let currentChange = !prevState[id];
            let newState = { ...prevState };
            for (let key in newState) { newState[key] = false; }
            newState[id] = currentChange;
            return newState;
        });
    };

    return (
        <ul className="AccordionComponent">
            {data.map((item) => (
                <li
                    key={item.id}
                    className="AccordionComponent__item"
                >
                    <button
                        className="AccordionComponent__btn"
                        onClick={() => toggleItem(item.id)}
                    >
                        {item.question}
                        <svg
                            viewBox="0 0 26 26"
                            className={`AccordionComponent__close-icon ${bItemsAreToggled[item.id] === true ? "open" : "closed"}`}>
                            <path d="M10.5 9.3L1.8 0.5 0.5 1.8 9.3 10.5 0.5 19.3 1.8 20.5 10.5 11.8 19.3 20.5 20.5 19.3 11.8 10.5 20.5 1.8 19.3 0.5 10.5 9.3Z"></path>
                        </svg>
                    </button>
                    <div className={`AccordionComponent__panel ${bItemsAreToggled[item.id] === true ? "open" : "closed"}`}>
                        <p>{item.answer}</p>
                    </div>
                </li>
            ))}
        </ul>
    );
};

export default AccordionComponent;