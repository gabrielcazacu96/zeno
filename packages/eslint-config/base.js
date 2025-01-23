import js from "@eslint/js";
import eslintConfigPrettier from "eslint-config-prettier";
import turbo from "eslint-plugin-turbo";
import tseslint from "typescript-eslint";
import onlyWarn from "eslint-plugin-only-warn";
import perfectionist from "eslint-plugin-perfectionist"
import eslintPluginPrettierRecommended from "eslint-plugin-prettier/recommended";

/** 
 * A shared ESLint configuration for the repository.
 *
 * @type {import("eslint").Linter.Config}
 * */
export const config = [
  js.configs.recommended,
  eslintConfigPrettier,
  ...tseslint.configs.recommended,
  {
    plugins: { turbo },
    rules: {
      "turbo/no-undeclared-env-vars": "warn",
    },
  },
  perfectionist.configs["recommended-natural"],
  eslintPluginPrettierRecommended,
  {
    plugins: { onlyWarn },
  },
  {
    ignores: ["dist/**"],
  },
]; 
