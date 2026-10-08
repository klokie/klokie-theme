export type AffiliateRewrite =
  /**
   * Append query params to any link on the program's hosts, keeping the path —
   * for programs that track a `?ref=`-style code on every page.
   */
  | { kind: "params"; params: Record<string, string> }
  /**
   * Replace the link with a personal referral URL — for programs that hand
   * out one tracking link. Only bare homepage links (path `/`) or the listed
   * `paths` are replaced, so a link to a specific docs page stays a docs link.
   * `links` maps further exact paths to their own tracking URLs (e.g. one
   * Gumroad affiliate link per product).
   */
  | { kind: "url"; url: string; paths?: string[]; links?: Record<string, string> }
  /**
   * Wrap any link in a network's deep-link redirect — CJ, Impact, etc.
   * `{url}` in the template is replaced with the URL-encoded original link.
   */
  | { kind: "deeplink"; template: string };

export interface AffiliateProgram {
  /** Slug used for the go-link: klokie.com/go/<id>. */
  id: string;
  name: string;
  /** Registrable hosts; `www.` is matched implicitly, other subdomains are not. */
  hosts: string[];
  /** Where the go-link points when the program isn't active. */
  homepage: string;
  status: "active" | "pending";
  rewrite: AffiliateRewrite;
}
