import { createContext, useContext, useState } from "react";

export type TNavContext = {
    isNavBackgroundActive: boolean;
    isHamburgerMenuToggled: boolean;
    setIsNavBackgroundActive: React.Dispatch<React.SetStateAction<boolean>>
    setIsHamburgerMenuToggled: React.Dispatch<React.SetStateAction<boolean>>
}

export const NavComponentContext = createContext<TNavContext | null>(null);

const NavComponentContextProvider = ({ children }) => {
    const [isNavBackgroundActive, setIsNavBackgroundActive] = useState<boolean>(false);
    const [isHamburgerMenuToggled, setIsHamburgerMenuToggled] = useState<boolean>(false);

    return (
        <NavComponentContext.Provider value={{
            isNavBackgroundActive: isNavBackgroundActive,
            isHamburgerMenuToggled: isHamburgerMenuToggled,
            setIsNavBackgroundActive: setIsNavBackgroundActive,
            setIsHamburgerMenuToggled: setIsHamburgerMenuToggled
        }}>
            {children}
        </NavComponentContext.Provider>
    );
};

const useNavContext = (): TNavContext => {
    const context = useContext(NavComponentContext) as TNavContext;
    if (context === null) {
        throw new Error("useNavContext must be used within a NavComponentContextProvider");
    }
    return context;
};

export default NavComponentContextProvider;
export { useNavContext }