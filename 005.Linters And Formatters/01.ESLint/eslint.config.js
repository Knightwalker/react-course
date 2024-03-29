import js from "@eslint/js";
import globals from "globals";
import eslintPluginReact from "eslint-plugin-react";

const config = [
    {
        files: ["**/*"],
        rules: {
            "indent": ["warn", 4]
        }
    },
    {
        files: ["src/**/*.{js,jsx,ts,tsx}"],
        languageOptions: {
            globals: { ...globals.browser },
            parserOptions: {
                ecmaVersion: 2022,
                sourceType: "module",
            }
        },
        rules: {
            ...js.configs.recommended.rules,
            "no-duplicate-imports": "warn",
            "no-unused-vars": "warn",
            "semi": ["warn", "always"],
            "eqeqeq": "warn"
        }
    },
    { 
        files: ["src/**/*.{jsx,tsx}"],
        languageOptions: {
            parserOptions: {
                ecmaFeatures: {
                    jsx: true
                }
            }
        },
        plugins: {
            react: eslintPluginReact
        },
        rules: { 
            ...eslintPluginReact.configs.recommended.rules,
            ...eslintPluginReact.configs["jsx-runtime"].rules
        },
        settings: {
            react: {
                version: "detect"
            }
        }
    }
];

export default config;