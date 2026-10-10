/**
 * Affiliate / referral programs, shared by every klokie site.
 *
 * Add a program here once and every outbound link to its hosts — in any site
 * using the `affiliates()` integration — picks up the code at build time, and
 * klokie.com serves it as a go-link at `/go/<id>`.
 *
 * Only `status: "active"` programs rewrite anything. `pending` entries record
 * a program worth joining; they are inert until a code is filled in.
 *
 * Codes and account logins are also kept in 1Password (account
 * grossfeld.1password.com, vault Personal): an "Affiliate" section on each
 * service's own login item. Payouts go to paypal@klokie.com wherever the
 * program allows it.
 *
 * Only list things Daniel actually uses and would recommend. Deliberately
 * left out: Proton (doesn't like it), Hetzner and Revolut (never used).
 */
import type { AffiliateProgram } from "./types.js";

export const programs: AffiliateProgram[] = [
  // ── Active ────────────────────────────────────────────────────────────
  {
    id: "oderland",
    name: "Oderland",
    hosts: ["oderland.se", "oderland.com"],
    homepage: "https://www.oderland.se/",
    status: "active",
    // Best Swedish web host — fine to recommend in any relevant article.
    rewrite: { kind: "url", url: "https://www.oderland.se/clients/aff.php?aff=141" },
  },
  {
    id: "lunchflow",
    name: "Lunch Flow",
    hosts: ["lunchflow.app"],
    homepage: "https://www.lunchflow.app/",
    status: "active",
    // Affonso: https://lunchflow.affonso.io/success-hub
    rewrite: { kind: "params", params: { atp: "klokie" } },
  },
  {
    id: "lunchmoney",
    name: "Lunch Money",
    hosts: ["lunchmoney.app"],
    homepage: "https://lunchmoney.app/",
    status: "active",
    // Applied 2026-10-08 as lunchmoney@klokie.com; approved 2026-10-10.
    // US$15 per paid subscriber, paid by IBAN transfer (not PayPal), US$30 minimum.
    rewrite: { kind: "url", url: "https://lunchmoney.app?fp_ref=daniel-grossfeld-0776c5" },
  },
  {
    id: "fachords",
    name: "FaChords Guitar (ebooks)",
    // The free site, fachords.com, has no program: link it plainly.
    hosts: ["fachords.gumroad.com"],
    homepage: "https://fachords.gumroad.com/",
    status: "active",
    // Gumroad affiliate, 50% commission, 30-day cookie (added 2026-10-07).
    rewrite: {
      kind: "url",
      url: "https://gumroad.com/a/304686435",
      links: {
        "/l/tvXjF": "https://gumroad.com/a/304686435/tvXjF", // Chords Domination
        "/l/QrgVt": "https://gumroad.com/a/304686435/QrgVt", // 52 Chord Progressions
        "/l/cBQOM": "https://gumroad.com/a/304686435/cBQOM", // 52 Chord Progressions (left-handed)
        "/l/hluxOQ": "https://gumroad.com/a/304686435/hluxOQ", // Chords Domination (left-handed)
        "/l/dCyxv": "https://gumroad.com/a/304686435/dCyxv", // Scales Over Chords
        "/l/giubc": "https://gumroad.com/a/304686435/giubc", // Ebooks bundle
      },
    },
  },

  // ── Pending: joined, waiting on approval or a link ──────────────────
  {
    id: "google-workspace",
    name: "Google Workspace",
    hosts: ["workspace.google.com"],
    homepage: "https://workspace.google.com/",
    status: "pending",
    // Applied 2026-10-08 via the referral program; awaiting approval.
    // Paste the personal referral URL into `url`. Also on CJ (advertiser
    // 5261736) — if that approves first, switch to a `deeplink` rewrite.
    rewrite: { kind: "url", url: "" },
  },
  {
    id: "namecheap",
    name: "Namecheap",
    hosts: ["namecheap.com"],
    homepage: "https://www.namecheap.com/",
    status: "pending",
    // Via CJ, advertiser 4055157 (apply once CJ is approved). Use the
    // deep-link format, e.g. https://www.anrdoezrs.net/click-<PID>-<AID>?url={url}
    rewrite: { kind: "deeplink", template: "" },
  },
  {
    id: "1password",
    name: "1Password",
    hosts: ["1password.com"],
    homepage: "https://1password.com/",
    status: "pending",
    // Via CJ, advertiser 5140517 — apply once CJ is approved.
    // https://1password.com/affiliate
    rewrite: { kind: "deeplink", template: "" },
  },
  // ── To join (uses and recommends) ─────────────────────────────────────
  {
    id: "digitalocean",
    name: "DigitalOcean",
    hosts: ["digitalocean.com"],
    homepage: "https://www.digitalocean.com/",
    status: "pending",
    // Referral credit, not cash. Link: control panel → Settings → Referrals.
    rewrite: { kind: "url", url: "" },
  },
  {
    id: "wise",
    name: "Wise",
    hosts: ["wise.com"],
    homepage: "https://wise.com/",
    status: "pending",
    // Invite program; personal link in the Wise app → Invite friends.
    rewrite: { kind: "url", url: "" },
  },
  {
    id: "tibber",
    name: "Tibber",
    hosts: ["tibber.com"],
    homepage: "https://tibber.com/se",
    status: "pending",
    // Invite bonus for both sides; code in the Tibber app → My Account.
    rewrite: { kind: "url", url: "", paths: ["/", "/se", "/se/"] },
  },
  {
    id: "native-instruments",
    name: "Native Instruments",
    hosts: ["native-instruments.com"],
    homepage: "https://www.native-instruments.com/",
    status: "pending",
    // Via impact.com — apply from the Impact account.
    rewrite: { kind: "deeplink", template: "" },
  },
  {
    id: "amazon",
    name: "Amazon",
    hosts: ["amazon.se", "amazon.com", "amazon.de", "amazon.co.uk"],
    homepage: "https://www.amazon.se/",
    status: "pending",
    // Amazon Associates: one tag per marketplace (https://affiliate-program.amazon.se/).
    // A single tag only earns on its own marketplace — split per-host
    // programs if joining more than amazon.se.
    rewrite: { kind: "params", params: {} },
  },
  {
    id: "notion",
    name: "Notion",
    hosts: ["notion.so", "notion.com"],
    homepage: "https://www.notion.com/",
    status: "pending",
    // Affiliate program runs on PartnerStack (login in 1Password).
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

  // ── No public program found: go-link only ────────────────────────────
  {
    id: "cloudflare",
    name: "Cloudflare",
    hosts: ["cloudflare.com"],
    homepage: "https://www.cloudflare.com/",
    status: "pending",
    rewrite: { kind: "url", url: "" },
  },
];
