/**
 * Affiliate / referral programs, shared by every klokie site.
 *
 * Add a program here once and every outbound link to its hosts — in any site
 * using the `affiliates()` integration — picks up the code at build time, and
 * klokie.com serves it as a go-link at `/go/<id>`.
 *
 * Only `status: "active"` programs rewrite anything. `pending` entries record
 * a program worth joining; they are inert until a code is filled in.
 */
import type { AffiliateProgram } from "./types.js";

export const programs: AffiliateProgram[] = [
  {
    id: "google-workspace",
    name: "Google Workspace",
    hosts: ["workspace.google.com"],
    homepage: "https://workspace.google.com/",
    status: "pending",
    // Join: https://refergoogleworkspace.withgoogle.com/ — gives a personal
    // referral URL; put it in `url` below.
    rewrite: { kind: "url", url: "" },
  },
  {
    id: "notion",
    name: "Notion",
    hosts: ["notion.so", "notion.com"],
    homepage: "https://www.notion.com/",
    status: "pending",
    // Join: https://notion.notion.site/Notion-Affiliate-Program-77a6852e38d24d909ebc62960e6d90f2
    rewrite: { kind: "url", url: "" },
  },
  {
    id: "cloudflare",
    name: "Cloudflare",
    hosts: ["cloudflare.com"],
    homepage: "https://www.cloudflare.com/",
    status: "pending",
    rewrite: { kind: "url", url: "" },
  },
  {
    id: "oderland",
    name: "Oderland",
    hosts: ["oderland.se", "oderland.com"],
    homepage: "https://www.oderland.se/",
    status: "pending",
    rewrite: { kind: "url", url: "" },
  },
  {
    id: "todoist",
    name: "Todoist",
    hosts: ["todoist.com"],
    homepage: "https://www.todoist.com/",
    status: "pending",
    rewrite: { kind: "url", url: "" },
  },
  {
    id: "namecheap",
    name: "Namecheap",
    hosts: ["namecheap.com"],
    homepage: "https://www.namecheap.com/",
    status: "pending",
    rewrite: { kind: "url", url: "" },
  },
  {
    id: "pipedream",
    name: "Pipedream",
    hosts: ["pipedream.com"],
    homepage: "https://pipedream.com/",
    status: "pending",
    rewrite: { kind: "url", url: "" },
  },
];
