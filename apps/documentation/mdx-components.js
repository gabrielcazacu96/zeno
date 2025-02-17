import { useMDXComponents as getThemeComponents } from "@zeno/documentation-layout"

// Get the default MDX components
const themeComponents = getThemeComponents()

// Merge components
export function useMDXComponents(components) {
  return {
    ...themeComponents,
    ...components,
  }
}
