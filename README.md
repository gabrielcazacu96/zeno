# Turborepo starter

This is an official starter Turborepo.

## What's inside?

This Turborepo includes the following packages/apps:

### Apps and Packages

- `docs`: a [Next.js](https://nextjs.org/) app
- `web`: another [Next.js](https://nextjs.org/) app
- `@zeno/ui`: a stub React component library shared by both `web` and `docs` applications
- `@zeno/typescript`: `tsconfig.json`s used throughout the monorepo
- `@zeno/supabase`: a library for working with Supabase in Next.js

Each package/app is 100% [TypeScript](https://www.typescriptlang.org/).

### Utilities

This Turborepo has some additional tools already setup for you:

- [TypeScript](https://www.typescriptlang.org/) for static type checking
- [Ultracite](https://www.ultracite.ai/) for code linting & formatting

### Build

To build all apps and packages, run the following command:

```
pnpm build
```

### Develop

To develop all apps and packages, run the following command:

```
pnpm dev
```

### Release packages

Package publishing is standardized with [release-please](https://github.com/googleapis/release-please) and Conventional Commits. Release PRs, per-package version bumps, and changelog entries are generated from commit history for the public packages in `packages/`.

Before publishing locally, authenticate with npm first:

```bash
pnpm login
```

1. Write release-worthy commits with [Conventional Commits](https://www.conventionalcommits.org/), for example `feat(ui): add combobox`, `fix(forms): preserve field defaults`, or `feat!: drop Node 20 support`.
2. Keep release-worthy changes scoped to the package paths you want to release; a commit can affect every public package whose files it touches.
3. When those commits land on `main`, the release workflow opens or updates a release PR with package versions and changelog entries derived from those commits.
4. The release workflow only publishes after `pnpm run ci` passes on `main`.
5. Merging the release PR publishes the released packages to npm with `NPM_TOKEN`.

Only release-driving commit types such as `feat`, `fix`, `perf`, and `BREAKING CHANGE:` affect package versions. Docs, test, and chore commits are still recorded in git, but they do not create a package release by themselves.

If `pnpm commitlint` fails, rewrite the offending commit message and run it again. For the latest commit, use `git commit --amend -m "feat(ui): add combobox"`. For older commits on your branch, use `git rebase -i main`, mark the commit as `reword`, then update it to a valid Conventional Commit such as `fix(forms): preserve field defaults`. If the branch was already pushed, follow up with `git push --force-with-lease`.

If you run `pnpm release:pr` locally, the script already knows the repo URL, but you still need a GitHub token in your shell, for example `export GITHUB_TOKEN=...`. `release-please` uses that token to open or update the release PR on `zeno-lib/zeno`.

### Remote Caching

> [!TIP]
> Vercel Remote Cache is free for all plans. Get started today at [vercel.com](https://vercel.com/signup?/signup?utm_source=remote-cache-sdk&utm_campaign=free_remote_cache).

Turborepo can use a technique known as [Remote Caching](https://turbo.build/repo/docs/core-concepts/remote-caching) to share cache artifacts across machines, enabling you to share build caches with your team and CI/CD pipelines.

By default, Turborepo will cache locally. To enable Remote Caching you will need an account with Vercel. If you don't have an account you can [create one](https://vercel.com/signup?utm_source=turborepo-examples), then enter the following commands:

```
pnpm turbo login
```

This will authenticate the Turborepo CLI with your [Vercel account](https://vercel.com/docs/concepts/personal-accounts/overview).

Next, you can link your Turborepo to your Remote Cache by running the following command from the root of your Turborepo:

```
pnpm turbo link
```

## Useful Links

Learn more about the power of Turborepo:

- [Tasks](https://turbo.build/repo/docs/core-concepts/monorepos/running-tasks)
- [Caching](https://turbo.build/repo/docs/core-concepts/caching)
- [Remote Caching](https://turbo.build/repo/docs/core-concepts/remote-caching)
- [Filtering](https://turbo.build/repo/docs/core-concepts/monorepos/filtering)
- [Configuration Options](https://turbo.build/repo/docs/reference/configuration)
- [CLI Usage](https://turbo.build/repo/docs/reference/command-line-reference)
