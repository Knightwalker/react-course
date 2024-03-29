import js from "@eslint/js";
import globals from "globals";
import eslintPluginReact from "eslint-plugin-react";
import eslintPluginReactHooks from "eslint-plugin-react-hooks";
import eslintPluginJsxA11y from "eslint-plugin-jsx-a11y";

const config = [
    {
        files: ["**/*"],
        rules: {
            "indent": ["warn", 4]
        }
    },
    {
        files: ["src/**/*.{js,jsx}"],
        languageOptions: {
            globals: { ...globals.browser },
            ecmaVersion: 2022,
            sourceType: "module",
            parserOptions: {
                ecmaVersion: 2022,
                sourceType: "module",
                ecmaFeatures: {
                    jsx: true
                }
            }
        },
        rules: {
            ...js.configs.recommended.rules,
            // Possible Problems
            "no-debugger": "warn", // overrides a default recommended rule
            "no-duplicate-imports": "warn",
            "no-unused-vars": "warn",
            // Suggestions
            "eqeqeq": "warn",
            "yoda": "warn",
            // Layout & Formatting
            "semi": ["warn", "always"],
            "semi-spacing": ["warn", { "before": false, "after": true }],
            "semi-style": ["warn", "last"],
            "space-before-blocks": ["error", "always"],
            "space-before-function-paren": ["warn", "never"],
            "space-infix-ops": ["warn", { "int32Hint": false }],
            "space-unary-ops": ["warn", { "words": true, "nonwords": false }],
            "switch-colon-spacing": "warn",
            "template-curly-spacing": ["warn", "never"],
            "wrap-regex": "warn",
        },
        settings: {
            react: {
                version: "detect"
            }
        }
    },
    {
        files: ["src/**/*.{jsx}"],
        languageOptions: {
            ecmaVersion: 2022,
            sourceType: "module",
            parserOptions: {
                ecmaVersion: 2022,
                sourceType: "module",
                ecmaFeatures: {
                    jsx: true
                }
            }
        },
        plugins: {
            react: eslintPluginReact,
            "react-hooks": eslintPluginReactHooks,
            "jsx-a11y": eslintPluginJsxA11y
        },
        rules: {
            ...eslintPluginReact.configs.recommended.rules,
            ...eslintPluginReact.configs["jsx-runtime"].rules,
            "react/prop-types": "off",
            ...eslintPluginReactHooks.configs.recommended.rules,
            ...eslintPluginJsxA11y.configs.recommended.rules
        },
        settings: {
            react: {
                version: "detect"
            }
        }
    }
];

export default config;