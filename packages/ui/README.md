# Shadcn UI

## Prompt to manage updates

```text
In `packages/ui`, run `pnpm dlx shadcn@latest add --all --yes --overwrite` to update Shadcn UI to the latest version. Then:

1. Fix all imports issues starting with `src/` to relative imports. Most likely replace 'src/' with '../' in the imports.
2. Fix lint issues by running `pnpm run lint:fix`.
3. Check build with `pnpm run build`.
```

## Issues
`components.json` aliases does not allow for relative paths. Some imports need to be update after installs.
