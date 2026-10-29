import { QueryClient } from "@tanstack/react-query";
import { createRouter, rootRouteId } from "@tanstack/react-router";
import { describe, expect, it } from "vitest";

import { routeTree } from "@/routeTree.gen";
import { isBlockedDeliveryDate } from "@/lib/delivery";

// Match routes without running loaders or rendering.
describe("App routing", () => {
  it("matches a page for /order instead of falling back to not found", () => {
    const router = createRouter({ routeTree, context: { queryClient: new QueryClient() } });

    const matches = router.matchRoutes("/order");

    expect(matches.at(-1)?.routeId).not.toBe(rootRouteId);
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
