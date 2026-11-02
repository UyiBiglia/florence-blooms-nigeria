import { QueryClient } from "@tanstack/react-query";
import { createRouter, rootRouteId } from "@tanstack/react-router";
import { describe, expect, it } from "vitest";

import { routeTree } from "@/routeTree.gen";
import { isBlockedDeliveryDate } from "@/lib/delivery";
import { BOUQUETS, suggestBouquet } from "@/lib/bouquets";

// Match routes without running loaders or rendering.
describe("App routing", () => {
  const cases = ["/", "/flowers", "/order", "/occasions", "/locations", "/about", "/contact"];
  for (const path of cases) {
    it(`matches a page for ${path} instead of falling back to not found`, () => {
      const router = createRouter({ routeTree, context: { queryClient: new QueryClient() } });
      const matches = router.matchRoutes(path);
      expect(matches.at(-1)?.routeId).not.toBe(rootRouteId);
    });
  }
});

// Placeholder Naira prices show on every catalog card, between ₦18,000 and ₦75,000.
describe("Bouquet catalog prices", () => {
  it("gives every bouquet a Naira price in the agreed placeholder range", () => {
    expect(BOUQUETS.length).toBeGreaterThanOrEqual(8);
    expect(BOUQUETS.length).toBeLessThanOrEqual(12);
    for (const bouquet of BOUQUETS) {
      expect(bouquet.price).toMatch(/^₦[\d,]+$/);
      const value = Number(bouquet.price.replace(/[₦,]/g, ""));
      expect(value).toBeGreaterThanOrEqual(18000);
      expect(value).toBeLessThanOrEqual(75000);
    }
  });
});

// "I don't have anything in mind yet": suggestion maps occasion, recipient
// (her / him / anyone) to a bouquet.
describe("Bouquet suggestions", () => {
  it("suggests the sympathy bouquet for a sympathy occasion", () => {
    expect(suggestBouquet("Sympathy").slug).toBe("pure-serenity");
  });
  it("still suggests a bouquet for an occasion with no dedicated match", () => {
    expect(suggestBouquet("Just Because")).toBeTruthy();
  });
  it("every bouquet is tagged for her, him, or anyone", () => {
    for (const bouquet of BOUQUETS) {
      expect(["her", "him", "anyone"]).toContain(bouquet.forWho);
    }
  });
  it("suggests a rose bouquet when the gift is for her", () => {
    const suggestion = suggestBouquet("Anniversary", "her");
    expect(["classic-red-roses", "anniversary-blush"]).toContain(suggestion.slug);
  });
  it("suggests a masculine-leaning bouquet when the gift is for him", () => {
    const suggestion = suggestBouquet("Birthday", "him");
    expect(suggestion.forWho).toBe("him");
  });
});

// The shop is closed on Saturdays: orders can never be delivered that day.
describe("Delivery date rules", () => {
  it("blocks Saturday deliveries", () => {
    // 31 October 2026 is a Saturday; 1 November 2026 is a Sunday.
    expect(new Date(2026, 9, 31).getDay()).toBe(6);
    expect(isBlockedDeliveryDate(new Date(2026, 9, 31))).toBe(true);
    expect(isBlockedDeliveryDate(new Date(2026, 10, 1))).toBe(false);
  });
});
