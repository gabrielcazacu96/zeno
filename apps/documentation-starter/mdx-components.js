import { useMDXComponents as getThemeComponents } from "@zeno/layouts"

// Get the default MDX components
const themeComponents = getThemeComponents()

// Merge components
export function useMDXComponents(components) {
  return {
    ...themeComponents,
    ...components,
  }
}
