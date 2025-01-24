import jseslint from "@eslint/js";
import turbo from "eslint-plugin-turbo";
import tseslint from "typescript-eslint";
import onlyWarn from "eslint-plugin-only-warn";
import perfectionist from "eslint-plugin-perfectionist"
import stylistic from '@stylistic/eslint-plugin'

/** 
 * A shared ESLint configuration for the repository.
 *
 * @type {import("eslint").Linter.Config}
 * */
export const config = [
  perfectionist.configs["recommended-natural"],
  stylistic.configs.customize({
    flat: true,
    quotes: 'double',
  }),
  jseslint.configs.recommended,
  ...tseslint.configs.recommended,
  {
    plugins: { turbo },
    rules: {
      "turbo/no-undeclared-env-vars": "warn",
    },
  },
  {
    plugins: { onlyWarn },
  },
  {
    ignores: ["dist/**"],
  },
]; 
