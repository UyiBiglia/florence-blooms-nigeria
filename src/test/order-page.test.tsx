import { QueryClient } from "@tanstack/react-query";
import { createRouter, rootRouteId } from "@tanstack/react-router";
import { describe, expect, it } from "vitest";

import { routeTree } from "@/routeTree.gen";
import { isBlockedDeliveryDate } from "@/lib/delivery";
import { BOUQUETS, suggestBouquet } from "@/lib/bouquets";
import { SOCIAL_LINKS } from "@/components/social-links";
import { CITIES, validateOrder } from "@/routes/order";

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
    expect(["bridal-white", "classic-red-roses", "anniversary-blush"]).toContain(
      suggestion.slug,
    );
    expect(suggestion.forWho).toBe("her");
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

// Orders deliver to the five supported cities, chosen from a dropdown, with a
// required area/LGA field and an optional landmark — no postal code.
describe("Delivery location flow", () => {
  it("limits orders to the five supported cities", () => {
    expect(CITIES).toEqual([
      "Lagos",
      "Abuja",
      "Port Harcourt",
      "Ibadan",
      "Kano",
    ]);
  });

  it("requires a delivery area but treats the landmark as optional", () => {
    const base = {
      bouquet: "classic-red-roses",
      name: "Ada Okonkwo",
      phone: "+234 800 000 0000",
      email: "ada@example.com",
      city: "Lagos",
      occasion: "Birthday",
      request: "Red roses in kraft wrap",
      deliveryDate: new Date(2026, 10, 2), // Monday, not a Saturday
      cardMessage: "",
    };
    const missingArea = validateOrder({ ...base, area: "", landmark: "" });
    expect(missingArea.area).toBeTruthy();
    const filled = validateOrder({ ...base, area: "Yaba", landmark: "" });
    expect(filled.landmark).toBeUndefined();
    expect(Object.values(filled).some(Boolean)).toBe(false);
  });
});

// The shop's official TikTok and X accounts appear as social links.
describe("Social links", () => {
  it("links the official TikTok and X handles", () => {
    expect(SOCIAL_LINKS.map((link) => link.url)).toEqual([
      "https://www.tiktok.com/@uyi_biglia",
      "https://x.com/Uyi_Biglia",
    ]);
  });
});
