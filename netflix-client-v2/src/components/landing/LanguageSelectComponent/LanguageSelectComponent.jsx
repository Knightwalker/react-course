import { useState } from "react";
import { LANGUAGES_MOCK_DATA } from "./LanguageSelectComponentData";
import "./LanguageSelectComponent.css";

const LanguageSelectComponent = ({ languages = LANGUAGES_MOCK_DATA }) => {
    const [selectedLanguage, setSelectedLanguage] = useState(languages.DEFAULT);

    const handleChange = (e) => {
        const selectedOption = e.currentTarget.options[e.currentTarget.selectedIndex];
        const { value: code } = selectedOption;

        const selectedKey = Object.keys(languages).find((key) => {
            return languages[key].code === code;
        });

        setSelectedLanguage({
            label: LANGUAGES_MOCK_DATA[selectedKey].label,
            code: LANGUAGES_MOCK_DATA[selectedKey].code
        });
    }

    const optionEls = Object.entries(languages).map(([key, value]) => {
        if (key === "DEFAULT") {
            return null;
        }
        return (
            <option
                key={key}
                value={value.code}
            >
                {value.label}
            </option>
        )
    }).filter(Boolean);

    return (
        <div className="LanguageSelectComponent">
            <i className="LanguageSelectComponent__globe-icon bi bi-globe"></i>
            <i className="LanguageSelectComponent__caret-icon bi bi-caret-down-fill"></i>
            <select
                onChange={handleChange}
                className="LanguageSelectComponent__select"
                value={selectedLanguage.code}
            >
                {optionEls}
            </select>
        </div>
    )

}

export default LanguageSelectComponent;