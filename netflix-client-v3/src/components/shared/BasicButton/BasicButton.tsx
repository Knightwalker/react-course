// Libs
import { ReactElement } from "react";

// Local
import styles from "./BasicButton.module.css";

type TBasicButtonProps = {
    variant?: string;
    color?: string;
    label?: string;
    onClick: React.MouseEventHandler<HTMLButtonElement>
}

const classNamesDict = {
    "solid": styles.solid,
    "crimson": styles.crimson
};

const BasicButton = ({
    variant = "solid",
    color = "crimson",
    label = "label",
    onClick
}: TBasicButtonProps): ReactElement => {
    return (
        <button
            className={`${styles.root} ${classNamesDict[variant]} ${classNamesDict[color]}`}
            onClick={onClick}
        >
            <span>{label}</span>
        </button>
    );
};

export default BasicButton;