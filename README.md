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

## Affiliate links

One registry — `src/affiliates/programs.ts` — for every klokie site. Add a
program there, set `status: "active"` with its code, and every outbound link to
that host picks the code up at build time.

```ts
// astro.config.ts
import { affiliates } from "@klokie/theme/affiliates";
export default defineConfig({ integrations: [mdx(), sitemap(), affiliates()] });
```

- **Markdown/MDX content** is rewritten automatically (rehype plugin).
- **Links hard-coded in `.astro` components** need `affiliateUrl(href)`.
- Rewritten links get `rel="sponsored noopener"` and `data-affiliate="<id>"`.
- Two rewrite kinds: `params` appends e.g. `?ref=klokie` to any page on the
  host; `url` swaps homepage links (or listed `paths`) for a personal referral
  URL and leaves deep links (docs etc.) alone; its `links` map gives
  specific paths their own tracking URL (one per Gumroad product); and
  `deeplink` wraps any link in a network redirect (CJ, Impact) via `{url}`.
- klokie.com serves `/go/<id>` from the same registry — the link to paste in
  email, LinkedIn, or docs outside the sites. Pending programs redirect to the
  plain homepage, so a go-link is safe to share before the code exists.

After changing the registry, run `pnpm update @klokie/theme` in each site — the
lockfile pins the theme commit, and nothing changes until it moves.
