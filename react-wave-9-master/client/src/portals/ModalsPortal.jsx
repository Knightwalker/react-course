import { useEffect, useRef } from "react";
import { createPortal } from "react-dom";

const ModalsPortal = ({children}) => {
    const elRef = useRef(null);

    if (!elRef.current) {
        elRef.current = document.createElement("div");
    }

    useEffect(() => {
        const modalsRoot = document.getElementById("modals");
        modalsRoot.appendChild(elRef.current);

        return () => {
            modalsRoot.removeChild(elRef.current)
        };
    }, []);

    return createPortal(<div>{children}</div>, elRef.current)
}

export default ModalsPortal;
