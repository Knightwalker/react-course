// Assets
import ProfileIconDefaultImg from "../../../assets/default-blue.png";

// Local styles
import styles from "./ProfileIcon.module.css";

const ProfileIcon = (): JSX.Element => {
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