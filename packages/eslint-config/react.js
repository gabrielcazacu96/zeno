import reactHooks from "eslint-plugin-react-hooks"
import react from "eslint-plugin-react"
import globals from "globals"
import { config as baseConfig } from "./base.js"

/**
 * A custom ESLint configuration for libraries that use React.
 *
 * @type {import("eslint").Linter.Config} */
export const config = [
  ...baseConfig,
  // https://github.com/jsx-eslint/eslint-plugin-react/tree/master?tab=readme-ov-file#configuring-shared-settings
  {
    files: ["**/*.{js,mjs,cjs,jsx,mjsx,ts,tsx,mtsx}"],
    ...react.configs.flat.recommended,
    languageOptions: {
      ...react.configs.flat.recommended.languageOptions,
      globals: {
        ...globals.serviceworker,
        ...globals.browser,
      },
    },
  },
  // https://github.com/facebook/react/tree/main/packages/eslint-plugin-react-hooks#flat-config-eslintconfigjsts
  {
    ...reactHooks.configs["recommended-latest"],
    rules: {
      ...reactHooks.configs["recommended-latest"].rules,
      // React scope no longer necessary with new JSX transform.
      "react/react-in-jsx-scope": "off",
    },
  }
]
