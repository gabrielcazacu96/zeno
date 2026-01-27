# AGENTS.md

## Project Overview

Zeno is a Turborepo monorepo containing shared packages and applications for building modern web applications with React, Next.js, and TypeScript.

## Project Structure

- `apps/`: Application packages
  - `docs/`: Documentation site (Next.js + Fumadocs) running at http://localhost:5002
- `packages/`: Shared libraries
  - `ui/`: React component library (Shadcn UI)
  - `typescript/`: Shared TypeScript configurations
  - `supabase/`: Supabase integration utilities for Next.js
  - `tailwind/`: Shared Tailwind CSS configuration

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
