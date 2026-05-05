# AGENTS.md

## Project Overview

Zeno is a Turborepo monorepo containing shared packages and applications for building modern web applications with React, Next.js, and TypeScript.

## Project Structure

- `apps/`: Application packages
  - `docs/`: Documentation site (Next.js + Fumadocs) running at http://localhost:5002
- `packages/`: Shared libraries
  - `ui/`: React component library (Shadcn UI)
  - `authentication/`: Pre-built Supabase auth UI flows
  - `supabase/`: Supabase integration utilities for Next.js
  - `e2e/`: Playwright end-to-end test suite
  - `typescript/`: Shared TypeScript configurations
  - `tailwind/`: Shared Tailwind CSS configuration
  - `vitest/`: Shared Vitest configuration

## Intent Layer

This file is the **root** of an Intent Layer — a hierarchy of small `AGENTS.md` files placed at semantic boundaries so agents load high-signal local context (purpose, contracts, anti-patterns, sharp edges) before touching code. This file holds workspace-wide conventions and inherits *down* into every package; per-package nodes hold their own invariants and inherit conventions *up* from here. Don't duplicate facts across nodes — put them at the shallowest node that covers all relevant paths.

Per-package nodes:

- [`apps/docs/AGENTS.md`](apps/docs/AGENTS.md) — Fumadocs documentation site
- [`packages/ui/AGENTS.md`](packages/ui/AGENTS.md) — `@zeno/ui` component primitives
- [`packages/authentication/AGENTS.md`](packages/authentication/AGENTS.md) — `@zeno/authentication` auth flow UI (read this before touching `verify/` or `email-sent/`)
- [`packages/supabase/AGENTS.md`](packages/supabase/AGENTS.md) — `@zeno/supabase` SSR client/middleware
- [`packages/e2e/AGENTS.md`](packages/e2e/AGENTS.md) — `@resolve/e2e` Playwright suite

Each leaf node uses the same six sections — Purpose & Scope, Entry Points & Contracts, Usage Patterns, Anti-patterns, Dependencies & Edges, Pitfalls — so you can pattern-match across the workspace. When adding a new package with non-trivial invariants, copy that template. Config-only packages (`typescript/`, `tailwind/`, `vitest/`) deliberately do not have nodes — their config files are self-documenting and a node would only repeat what's already there.

## Development Commands

- Install dependencies: `pnpm install`
- Start dev servers: `pnpm dev`
- Build all packages: `pnpm build`
- Type check: `pnpm types:check`
- Lint code: `pnpm lint`
- Fix lint issues: `pnpm lint:fix`
- Run CI checks: `pnpm ci`

### Package-Specific Commands

Run commands for a specific package using Turborepo filters:

```bash
pnpm turbo run <command> --filter <package_name>
```

Example: `pnpm turbo run dev --filter @zeno/docs`


## TypeScript Conventions

- Use TypeScript for all code
- Prefer interfaces over types for object shapes
- Use functional and declarative programming patterns
- Avoid classes and enums; use literal types or maps instead
- Favor named exports; avoid default exports
- Use descriptive variable names with auxiliary verbs (e.g., `isLoading`, `hasError`)
- Use early returns for better readability
- Use `const` by default, `let` only when reassignment is needed, never `var`

## React/Next.js Conventions

- Use React 19+ conventions
- Use Next.js 15+ conventions
- Minimize client components (`"use client"`)
- Always use functional components, never class components
- Implement props with interfaces
- Use functions (not lambdas) for component definitions
- Always add loading and error states to data fetching components

## Testing

- Use **Vitest** for unit testing
- Use **Playwright** for E2E testing
- Run tests: `pnpm turbo run test`
- Run E2E tests: `pnpm turbo run e2e`
- Watch mode: `pnpm turbo run test:watch` or `pnpm turbo run e2e:watch`

## Security

- Use .env for local overrides; never commit secrets. 

## Package Management

- Use `pnpm` as the package manager

## AI Preferences

- Be concise


# Ultracite Code Standards

This project uses **Ultracite**, a zero-config preset that enforces strict code quality standards through automated formatting and linting.

## Quick Reference

- **Format code**: `pnpm dlx ultracite fix`
- **Check for issues**: `pnpm dlx ultracite check`
- **Diagnose setup**: `pnpm dlx ultracite doctor`

Biome (the underlying engine) provides robust linting and formatting. Most issues are automatically fixable.

---

## Core Principles

Write code that is **accessible, performant, type-safe, and maintainable**. Focus on clarity and explicit intent over brevity.

### Type Safety & Explicitness

- Use explicit types for function parameters and return values when they enhance clarity
- Prefer `unknown` over `any` when the type is genuinely unknown
- Use const assertions (`as const`) for immutable values and literal types
- Leverage TypeScript's type narrowing instead of type assertions
- Use meaningful variable names instead of magic numbers - extract constants with descriptive names

### Modern JavaScript/TypeScript

- Use arrow functions for callbacks and short functions
- Prefer `for...of` loops over `.forEach()` and indexed `for` loops
- Use optional chaining (`?.`) and nullish coalescing (`??`) for safer property access
- Prefer template literals over string concatenation
- Use destructuring for object and array assignments
- Use `const` by default, `let` only when reassignment is needed, never `var`

### Async & Promises

- Always `await` promises in async functions - don't forget to use the return value
- Use `async/await` syntax instead of promise chains for better readability
- Handle errors appropriately in async code with try-catch blocks
- Don't use async functions as Promise executors

### React & JSX

- Use function components over class components
- Call hooks at the top level only, never conditionally
- Specify all dependencies in hook dependency arrays correctly
- Use the `key` prop for elements in iterables (prefer unique IDs over array indices)
- Nest children between opening and closing tags instead of passing as props
- Don't define components inside other components
- Use semantic HTML and ARIA attributes for accessibility:
  - Provide meaningful alt text for images
  - Use proper heading hierarchy
  - Add labels for form inputs
  - Include keyboard event handlers alongside mouse events
  - Use semantic elements (`<button>`, `<nav>`, etc.) instead of divs with roles

### Error Handling & Debugging

- Remove `console.log`, `debugger`, and `alert` statements from production code
- Throw `Error` objects with descriptive messages, not strings or other values
- Use `try-catch` blocks meaningfully - don't catch errors just to rethrow them
- Prefer early returns over nested conditionals for error cases

### Code Organization

- Keep functions focused and under reasonable cognitive complexity limits
- Extract complex conditions into well-named boolean variables
- Use early returns to reduce nesting
- Prefer simple conditionals over nested ternary operators
- Group related code together and separate concerns

### Security

- Add `rel="noopener"` when using `target="_blank"` on links
- Avoid `dangerouslySetInnerHTML` unless absolutely necessary
- Don't use `eval()` or assign directly to `document.cookie`
- Validate and sanitize user input

### Performance

- Avoid spread syntax in accumulators within loops
- Use top-level regex literals instead of creating them in loops
- Prefer specific imports over namespace imports
- Avoid barrel files (index files that re-export everything)
- Use proper image components (e.g., Next.js `<Image>`) over `<img>` tags

### Framework-Specific Guidance

**Next.js:**
- Use Next.js `<Image>` component for images
- Use `next/head` or App Router metadata API for head elements
- Use Server Components for async data fetching instead of async Client Components

**React 19+:**
- Use ref as a prop instead of `React.forwardRef`

**Solid/Svelte/Vue/Qwik:**
- Use `class` and `for` attributes (not `className` or `htmlFor`)

---

## Testing

- Write assertions inside `it()` or `test()` blocks
- Avoid done callbacks in async tests - use async/await instead
- Don't use `.only` or `.skip` in committed code
- Keep test suites reasonably flat - avoid excessive `describe` nesting

## When Biome Can't Help

Biome's linter will catch most issues automatically. Focus your attention on:

1. **Business logic correctness** - Biome can't validate your algorithms
2. **Meaningful naming** - Use descriptive names for functions, variables, and types
3. **Architecture decisions** - Component structure, data flow, and API design
4. **Edge cases** - Handle boundary conditions and error states
5. **User experience** - Accessibility, performance, and usability considerations
6. **Documentation** - Add comments for complex logic, but prefer self-documenting code

---

Most formatting and common issues are automatically fixed by Biome. Run `pnpm dlx ultracite fix` before committing to ensure compliance.
