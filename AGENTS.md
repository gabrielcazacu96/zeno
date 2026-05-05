# AGENTS.md

## Project Overview

Zeno is a Turborepo monorepo containing shared packages and applications for building modern web applications with React, Next.js, and TypeScript.

## Workspace

This file is the **root of an Intent Layer** — a hierarchy of small `AGENTS.md` files placed at semantic boundaries so agents load high-signal local context (purpose, contracts, anti-patterns, sharp edges) before touching code. This file holds workspace-wide conventions and inherits *down* into every package; per-package nodes hold their own invariants and inherit conventions *up* from here. Don't duplicate facts across nodes — put them at the shallowest node that covers all relevant paths.

Linked entries below have a leaf node — open it before working in that area. Each leaf uses the same six sections (Purpose & Scope, Entry Points & Contracts, Usage Patterns, Anti-patterns, Dependencies & Edges, Pitfalls) so you can pattern-match across the workspace; copy that template when adding a new package with non-trivial invariants. Config-only packages (`typescript/`, `tailwind/`, `vitest/`) deliberately have no node — their config files are self-documenting and a node would only repeat them.

- `apps/`
  - [`docs/`](apps/docs/AGENTS.md) — Documentation site (Next.js + Fumadocs) on port 5002
- `packages/`
  - [`ui/`](packages/ui/AGENTS.md) — `@zeno/ui` component primitives (Base UI + Tailwind)
  - [`authentication/`](packages/authentication/AGENTS.md) — `@zeno/authentication` Supabase auth flows (read before touching `verify/` or `email-sent/`)
  - [`supabase/`](packages/supabase/AGENTS.md) — `@zeno/supabase` SSR client + middleware
  - [`e2e/`](packages/e2e/AGENTS.md) — `@resolve/e2e` Playwright suite
  - `typescript/` — shared `tsconfig` presets
  - `tailwind/` — shared Tailwind globals
  - `vitest/` — shared Vitest config

## Commands

| Command | What it does |
|---|---|
| `pnpm install` | Install workspace deps. Triggers `fumadocs-mdx` codegen via `apps/docs` postinstall. |
| `pnpm dev` | Run every package's dev task in parallel (docs serves on port 5002). |
| `pnpm build` | Build everything (`turbo build`). |
| `pnpm types:check` | Run `tsc --noEmit` across the graph (the docs app runs `fumadocs-mdx` + `next typegen` first). |
| `pnpm test` / `pnpm test:watch` | Run / watch Vitest unit tests. `test` depends on `build` and `lint`. |
| `pnpm e2e` / `pnpm e2e:watch` | Run / watch Playwright. Requires `pnpm exec playwright install --with-deps` once in `packages/e2e/`. |
| `pnpm lint` / `pnpm lint:fix` | Ultracite check / autofix. |
| `pnpm ci` | Full pre-PR pipeline: `lint → types:check → build → test → e2e`. |

Scope a command to one package with `pnpm turbo run <task> --filter <pkg-name>` (e.g. `--filter @zeno/docs`).

## Formatting

Ultracite (Biome under the hood) enforces formatting and most lint rules. **Don't hand-format** — `pnpm lint:fix` autofixes. In Cursor, `.cursor/hooks.json` runs `pnpm dlx ultracite fix` automatically after every file edit, so file content visible right after a write may already differ from what was written.

## Security

Use `.env` files for local overrides. Never commit secrets.
