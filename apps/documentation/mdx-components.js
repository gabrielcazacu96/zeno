import { useMDXComponents as getThemeComponents } from "@zeno/documentation-theme"

// Get the default MDX components
const themeComponents = getThemeComponents()

// Merge components
export function useMDXComponents(components) {
  return {
    ...themeComponents,
    ...components,
  }
}
