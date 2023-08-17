type TNavLink = {
    label: string;
    path: string;
};

type TLogoProps = {
    path: string
}

type TNavComponentProps = {
    logoLink: TLogoProps;
    navLinks: TNavLink[];
};

type PrimaryDesktopNavProps = {
    logoLink: TLogoProps;
    navLinks: TNavLink[];
}

type PrimaryMobileNavProps = {
    logoLink: TLogoProps;
    navLinks: TNavLink[];
}

export {
    TNavLink,
    TLogoProps,
    TNavComponentProps,
    PrimaryDesktopNavProps,
    PrimaryMobileNavProps
}