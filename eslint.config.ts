// eslint.config.ts
import tseslint from "typescript-eslint";
// import prettierConfig from "eslint-config-prettier";
import importPlugin from "eslint-plugin-import";

// THIS IS THE NEW, CORRECT APPROACH
export default tseslint.config(
    // 1. Global ignores
    {
        ignores: [
            "node_modules/",
            "dist/",
            "build/",
            "coverage/",
            "**/*.config.js",
            "**/*.config.ts",
        ],
    },

    // 2. Base ESLint and TypeScript configurations
    ...tseslint.configs.recommendedTypeChecked,

    {
        files: ["**/*.ts", "**/*.tsx", "**/*.js", "**/*.jsx"],
        languageOptions: {
            parserOptions: {
                project: true, // Automatically find tsconfig.json
                tsconfigRootDir: import.meta.dirname, // Use the current dir to search
            },
        },
    },

    // 3. Configuration for the import plugin
    {
        plugins: {
            "import": importPlugin,
        },
        rules: {
            // Rules for eslint-plugin-import
            "import/extensions": [
                "error",
                "ignorePackages",
                {
                    js: "never",
                    jsx: "never",
                    ts: "never",
                    tsx: "never",
                },
            ],
        },
        settings: {
            "import/resolver": {
                node: true,
                typescript: true
            }
        }
    },

    // 4. Your custom rule overrides
    {
        rules: {
            "no-unused-vars": "off",
            "@typescript-eslint/no-unused-vars": "warn",
            "@typescript-eslint/no-explicit-any": "off",
            "no-underscore-dangle": "off",
            "no-multiple-empty-lines": ["error", { "max": 1, "maxEOF": 0, "maxBOF": 0 }],
            "no-trailing-spaces": "error",
            "eol-last": "error",
            "max-len": ["error", { "code": 120 }],
        },
    },

    // 5. Prettier config must be last
    // prettierConfig
);