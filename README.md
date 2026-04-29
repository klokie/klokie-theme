# @klokie/theme

Shared design tokens, presets, and Astro components for klokie sites.

## Presets

- `jordsang` — Arbetarorkestern visual identity (warm earth, folk poster soul)
- `klokie` — Klokie default (dark, neon orange accent)

## Usage in an Astro site

`package.json`:
```json
{
  "dependencies": {
    "@klokie/theme": "file:../klokie-theme"
  }
}
```

`astro.config.ts` consumer or layout:
```astro
---
import BaseLayout from "@klokie/theme/layouts/BaseLayout.astro";
import { jordsang } from "@klokie/theme";
import "@klokie/theme/tokens/jordsang.css";
---
<BaseLayout title="Site" preset={jordsang}>
  ...
</BaseLayout>
```

## Adding a preset

1. New file in `src/tokens/<name>.css` with `:root { --primary: ...; }`
2. New file in `src/presets/<name>.ts` exporting a `ThemePreset`
3. Re-export from `src/index.ts`
4. Add the export entry to `package.json` `exports`

## Source of truth

For now this package owns the tokens. The pptx-generator brand tokens at
`vault/.claude/skills/pptx-generator/brands/klokie/colors_and_type.css` should
eventually import from here; until then accept duplication.
