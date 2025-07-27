# Shadcn UI

## Add all components

```bash
npx shadcn@latest add --all --yes --overwrite
```

## Prompt to manage update

```text
Run `npx shadcn@latest add --all --yes --overwrite` from `packages/ui` to update shadcn to the latest version. Once it's done:

1. Check for previous lint fixes that start with `biome-ignore` and re-apply them. In order to do this you'll need to check in the git diff for the changes applied by the `shadcn add` command.
2. Replace `Import * as React from "react"` with `import React from "react"`
3. Fix all imports starting with `src/` to relative imports
4. Run `pnpm run format` from the root, but do not try to fix any issues.
5. Stop here.
```