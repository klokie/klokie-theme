/**
 * Affiliate links for klokie sites.
 *
 * - `affiliateUrl(href)` — pure rewrite, for links built in components.
 * - `rehypeAffiliateLinks` — rewrites every `<a>` in Markdown/MDX content.
 * - `affiliates()` — Astro integration that installs the rehype plugin.
 * - `goLink(id)` — destination for klokie.com/go/<id>.
 *
 * Rewritten links get `rel="sponsored noopener"` (Google's required marking
 * for paid links) and `data-affiliate="<id>"` for analytics.
 */
import type { AstroIntegration } from "astro";
import { programs } from "./programs.js";
import type { AffiliateProgram } from "./types.js";

export { programs };
export type { AffiliateProgram, AffiliateRewrite } from "./types.js";

const bareHost = (host: string) => host.toLowerCase().replace(/^www\./, "");

function isActive(p: AffiliateProgram): boolean {
  if (p.status !== "active") return false;
  return p.rewrite.kind === "url" ? Boolean(p.rewrite.url) : Object.keys(p.rewrite.params).length > 0;
}

export function findProgram(href: string, list: AffiliateProgram[] = programs): AffiliateProgram | undefined {
  let url: URL;
  try {
    url = new URL(href);
  } catch {
    return undefined; // relative, mailto:, fragments — never affiliate targets
  }
  if (url.protocol !== "https:" && url.protocol !== "http:") return undefined;
  const host = bareHost(url.hostname);
  return list.find((p) => isActive(p) && p.hosts.some((h) => bareHost(h) === host));
}

/** Rewritten href plus the program it matched, or `undefined` to leave the link alone. */
export function affiliateLink(
  href: string,
  list: AffiliateProgram[] = programs,
): { href: string; program: AffiliateProgram } | undefined {
  const program = findProgram(href, list);
  if (!program) return undefined;
  const url = new URL(href);
  const rw = program.rewrite;

  if (rw.kind === "params") {
    for (const [k, v] of Object.entries(rw.params)) {
      if (!url.searchParams.has(k)) url.searchParams.set(k, v);
    }
    return { href: url.href, program };
  }

  const paths = rw.paths ?? ["/"];
  return paths.includes(url.pathname) ? { href: rw.url, program } : undefined;
}

/** `href` with the affiliate code applied, or unchanged when no program matches. */
export function affiliateUrl(href: string, list: AffiliateProgram[] = programs): string {
  return affiliateLink(href, list)?.href ?? href;
}

/** Destination for /go/<id>: the referral link when active, else the homepage. */
export function goLink(id: string, list: AffiliateProgram[] = programs): string | undefined {
  const program = list.find((p) => p.id === id);
  if (!program) return undefined;
  if (!isActive(program)) return program.homepage;
  return program.rewrite.kind === "url" ? program.rewrite.url : affiliateUrl(program.homepage, list);
}

// Minimal hast shapes — avoids a dependency on @types/hast.
interface HastNode {
  type: string;
  tagName?: string;
  properties?: Record<string, unknown>;
  children?: HastNode[];
}

function relTokens(rel: unknown): string[] {
  if (Array.isArray(rel)) return rel.map(String);
  if (typeof rel === "string") return rel.split(/\s+/).filter(Boolean);
  return [];
}

/** Rehype plugin: apply affiliate codes to every outbound `<a href>`. */
export function rehypeAffiliateLinks(options: { programs?: AffiliateProgram[] } = {}) {
  const list = options.programs ?? programs;
  const visit = (node: HastNode) => {
    if (node.type === "element" && node.tagName === "a" && typeof node.properties?.href === "string") {
      const match = affiliateLink(node.properties.href, list);
      if (match) {
        node.properties.href = match.href;
        const rel = new Set([...relTokens(node.properties.rel), "sponsored", "noopener"]);
        node.properties.rel = [...rel];
        node.properties.dataAffiliate = match.program.id;
      }
    }
    node.children?.forEach(visit);
  };
  return (tree: HastNode) => visit(tree);
}

/** Astro integration: `integrations: [affiliates()]` in astro.config. */
export function affiliates(options: { programs?: AffiliateProgram[] } = {}): AstroIntegration {
  return {
    name: "@klokie/theme/affiliates",
    hooks: {
      "astro:config:setup": ({ updateConfig }) => {
        updateConfig({ markdown: { rehypePlugins: [[rehypeAffiliateLinks, options]] } });
      },
    },
  };
}
