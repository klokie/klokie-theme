import { describe, expect, it } from "vitest";
import { affiliateLink, affiliateUrl, goLink, rehypeAffiliateLinks } from "./index.js";
import type { AffiliateProgram } from "./types.js";

const list: AffiliateProgram[] = [
  {
    id: "params-co",
    name: "Params Co",
    hosts: ["params.example"],
    homepage: "https://params.example/",
    status: "active",
    rewrite: { kind: "params", params: { ref: "klokie" } },
  },
  {
    id: "url-co",
    name: "URL Co",
    hosts: ["url.example"],
    homepage: "https://url.example/",
    status: "active",
    rewrite: {
      kind: "url",
      url: "https://partners.url.example/r/klokie",
      paths: ["/", "/pricing"],
      links: { "/l/abc": "https://partners.url.example/r/klokie/abc" },
    },
  },
  {
    id: "deep-co",
    name: "Deep Co",
    hosts: ["deep.example"],
    homepage: "https://deep.example/",
    status: "active",
    rewrite: { kind: "deeplink", template: "https://track.example/click-1-2?url={url}" },
  },
  {
    id: "pending-co",
    name: "Pending Co",
    hosts: ["pending.example"],
    homepage: "https://pending.example/",
    status: "pending",
    rewrite: { kind: "params", params: { ref: "klokie" } },
  },
];

describe("affiliateUrl", () => {
  it("appends params on any path, keeping existing query", () => {
    expect(affiliateUrl("https://www.params.example/docs?x=1", list)).toBe(
      "https://www.params.example/docs?x=1&ref=klokie",
    );
  });

  it("does not override a param the author set", () => {
    expect(affiliateUrl("https://params.example/?ref=someone", list)).toBe("https://params.example/?ref=someone");
  });

  it("replaces only homepage/listed paths for url programs", () => {
    expect(affiliateUrl("https://url.example/", list)).toBe("https://partners.url.example/r/klokie");
    expect(affiliateUrl("https://url.example/pricing", list)).toBe("https://partners.url.example/r/klokie");
    expect(affiliateUrl("https://url.example/docs/setup", list)).toBe("https://url.example/docs/setup");
  });

  it("maps listed paths to their own tracking links", () => {
    expect(affiliateUrl("https://url.example/l/abc", list)).toBe("https://partners.url.example/r/klokie/abc");
  });

  it("wraps any link in a deeplink template, URL-encoded", () => {
    expect(affiliateUrl("https://deep.example/hosting/?x=1", list)).toBe(
      "https://track.example/click-1-2?url=https%3A%2F%2Fdeep.example%2Fhosting%2F%3Fx%3D1",
    );
  });

  it("ignores pending programs, other subdomains, and non-http links", () => {
    expect(affiliateUrl("https://pending.example/", list)).toBe("https://pending.example/");
    expect(affiliateUrl("https://app.params.example/", list)).toBe("https://app.params.example/");
    expect(affiliateUrl("/about", list)).toBe("/about");
    expect(affiliateUrl("mailto:x@params.example", list)).toBe("mailto:x@params.example");
  });

  it("reports which program matched", () => {
    expect(affiliateLink("https://params.example/", list)?.program.id).toBe("params-co");
  });
});

describe("goLink", () => {
  it("resolves active programs to their referral link", () => {
    expect(goLink("url-co", list)).toBe("https://partners.url.example/r/klokie");
    expect(goLink("params-co", list)).toBe("https://params.example/?ref=klokie");
    expect(goLink("deep-co", list)).toBe("https://track.example/click-1-2?url=https%3A%2F%2Fdeep.example%2F");
  });

  it("falls back to the homepage for pending programs, undefined for unknown ids", () => {
    expect(goLink("pending-co", list)).toBe("https://pending.example/");
    expect(goLink("nope", list)).toBeUndefined();
  });
});

describe("rehypeAffiliateLinks", () => {
  it("rewrites matching anchors and marks them sponsored", () => {
    const a = { type: "element", tagName: "a", properties: { href: "https://params.example/", rel: ["nofollow"] } };
    const other = { type: "element", tagName: "a", properties: { href: "https://elsewhere.example/" } };
    const tree = { type: "root", children: [{ type: "element", tagName: "p", properties: {}, children: [a, other] }] };

    rehypeAffiliateLinks({ programs: list })(tree);

    expect(a.properties).toEqual({
      href: "https://params.example/?ref=klokie",
      rel: ["nofollow", "sponsored", "noopener"],
      dataAffiliate: "params-co",
    });
    expect(other.properties).toEqual({ href: "https://elsewhere.example/" });
  });
});
