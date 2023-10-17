import js from "@eslint/js";
import globals from "globals";
import eslintPluginReact from "eslint-plugin-react";
import eslintPluginReactHooks from "eslint-plugin-react-hooks";
import eslintPluginJsxA11y from "eslint-plugin-jsx-a11y";
import typescriptEslintParser from "@typescript-eslint/parser";
import typescriptEslintPlugin from "@typescript-eslint/eslint-plugin";

const config = [
    {
        files: ["**/*"],
        rules: {
            "indent": ["warn", 4]
        }
    },
    {
        files: ["src/**/*.{ts,tsx}"],
        languageOptions: {
            globals: { ...globals.browser },
            parser: typescriptEslintParser,
            parserOptions: {
                ecmaVersion: 2022,
                ecmaFeatures: {
                    jsx: true
                }
            }
        },
        plugins: {
            "@typescript-eslint": typescriptEslintPlugin
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
            ...typescriptEslintPlugin.configs.recommended.rules
        }
    },
    {
        files: ["src/**/*.tsx"],
        languageOptions: {
            parser: typescriptEslintParser,
            parserOptions: {
                ecmaVersion: 2022,
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
            // required by "eslint-plugin-react"
            react: {
                version: "detect"
            }
        }
    }
];

export default config;