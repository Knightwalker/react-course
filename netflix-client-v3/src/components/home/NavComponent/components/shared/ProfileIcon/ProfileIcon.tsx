// Libs
import { ReactElement } from "react";

// Assets
import ProfileIconDefaultImg from "@assets/home/account_icon1.png";

// Local styles
import styles from "./ProfileIcon.module.css";

const ProfileIcon = (): ReactElement => {
    return (
        <div className={styles.img_wrapper}>
            <img
                className={styles.img}
                src={ProfileIconDefaultImg}
                alt="Profile"
            />
        </div>
    );
};

export default ProfileIcon;