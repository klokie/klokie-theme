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
   */
  | { kind: "url"; url: string; paths?: string[] };

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
