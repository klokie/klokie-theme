# AGENTS — @klokie/theme

Shared tokens, presets, components and **affiliate links** for every klokie
site (klokie.com, arbetarorkestern, guitar-tuner, …).

## Affiliate links — read first

`src/affiliates/programs.ts` is the **single registry** of affiliate and
referral programs for all klokie sites. Use it; never hand-roll.

- **Adding a code:** set `status: "active"` and fill in `rewrite` on the
  program. Use `params` for `?ref=`-style codes that work on any page, and
  `url` for a single personal referral link. Run `pnpm test`.
- **New program:** add an entry. `pending` entries are inert, so record a
  program as soon as you know about it.
- **New site, or a site without it:** add `affiliates()` from
  `@klokie/theme/affiliates` to `integrations` in `astro.config`. Links
  hard-coded in `.astro` files need `affiliateUrl(href)`.
- **After any registry change:** run `pnpm update @klokie/theme` in every
  consuming site, then push it. The lockfile pins the theme commit, so
  nothing changes until it moves.
- **Content authors:** write plain product URLs. klokie.com serves
  `/go/<id>` for links used outside the sites.

See `README.md` → "Affiliate links" for the mechanics.

## Everything else

- Standards: `~/vault/resources/programming/klokie-web-stack.md`.
- Never duplicate theme code in a site. If something is missing, add it here.
