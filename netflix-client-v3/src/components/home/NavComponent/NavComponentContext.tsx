import { createContext, useContext, useState } from "react";

export type TNavContext = {
    isNavBackgroundActive: boolean;
    isHamburgerMenuActive: boolean;
    setIsNavBackgroundActive: React.Dispatch<React.SetStateAction<boolean>>
    setIsHamburgerMenuActive: React.Dispatch<React.SetStateAction<boolean>>
}

export const NavComponentContext = createContext<TNavContext | null>(null);

const NavComponentContextProvider = ({ children }) => {
    const [isNavBackgroundActive, setIsNavBackgroundActive] = useState<boolean>(false);
    const [isHamburgerMenuActive, setIsHamburgerMenuActive] = useState<boolean>(false);

    return (
        <NavComponentContext.Provider value={{
            isNavBackgroundActive: isNavBackgroundActive,
            isHamburgerMenuActive: isHamburgerMenuActive,
            setIsNavBackgroundActive: setIsNavBackgroundActive,
            setIsHamburgerMenuActive: setIsHamburgerMenuActive
        }}>
            {children}
        </NavComponentContext.Provider>
    );
};

const useNavContext = (): TNavContext => {
    const context = useContext(NavComponentContext);
    if (context === null) {
        throw new Error("useNavContext must be used within a NavComponentContextProvider");
    }
    return context;
};

export default NavComponentContextProvider;
export { useNavContext }