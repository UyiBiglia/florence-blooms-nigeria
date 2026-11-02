import { useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";

import { BOUQUETS, isRecipient, RECIPIENTS, type Recipient } from "@/lib/bouquets";

export const Route = createFileRoute("/flowers")({
  validateSearch: (search: Record<string, unknown>) => ({
    for: typeof search.for === "string" && isRecipient(search.for) ? search.for : undefined,
  }),
  head: () => ({
    meta: [
      { title: "Fresh Flowers & Bouquets — Florence Flowers" },
      {
        name: "description",
        content:
          "Browse our bouquets and arrangements — from ₦18,000 — for her, for him, or for anyone. Order for delivery in Lagos, Abuja, Port Harcourt, Ibadan, or Kano. We deliver Sunday to Friday.",
      },
      {
        property: "og:title",
        content: "Fresh Flowers & Bouquets — Florence Flowers",
      },
      {
        property: "og:description",
        content:
          "Browse our bouquets and arrangements — from ₦18,000 — for her, for him, or for anyone. Order for delivery in Lagos, Abuja, Port Harcourt, Ibadan, or Kano. We deliver Sunday to Friday.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: FlowersPage,
});

const recipientLabel: Record<Recipient, string> = {
  her: "For her",
  him: "For him",
  anyone: "For anyone",
};

function FlowersPage() {
  const { for: forParam } = Route.useSearch();
  const [recipient, setRecipient] = useState<Recipient | "all">(forParam ?? "all");

  const visible =
    recipient === "all" ? BOUQUETS : BOUQUETS.filter((b) => b.forWho === recipient);

  const tabs: { value: Recipient | "all"; label: string }[] = [
    { value: "all", label: "All flowers" },
    ...RECIPIENTS.map((r) => ({ value: r.value, label: r.plural })),
  ];

  return (
    <div className="mx-auto max-w-6xl px-4 py-14 sm:px-6">
      <header className="max-w-2xl">
        <h1 className="text-4xl font-semibold text-foreground sm:text-5xl">
          Fresh Flowers &amp; Bouquets
        </h1>
        <p className="mt-3 text-lg text-muted-foreground">
          Made fresh every morning and delivered Sunday to Friday in all five
          cities. Browse by who the gift is for, then pick a bouquet. Prices
          are starting points — we'll confirm the final details with you.
        </p>
      </header>

      <div
        role="tablist"
        aria-label="Filter bouquets by recipient"
        className="mt-8 flex flex-wrap gap-2"
      >
        {tabs.map((tab) => {
          const active = recipient === tab.value;
          return (
            <button
              key={tab.value}
              type="button"
              role="tab"
              aria-selected={active}
              onClick={() => setRecipient(tab.value)}
              className={
                active
                  ? "rounded-full bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground shadow-sm"
                  : "rounded-full border border-border bg-card px-4 py-2 text-sm font-medium text-muted-foreground transition-colors hover:bg-accent hover:text-foreground"
              }
            >
              {tab.label}
            </button>
          );
        })}
      </div>

      {visible.length === 0 ? (
        <p className="mt-10 text-muted-foreground">
          No bouquets in this category yet —{" "}
          <button
            type="button"
            onClick={() => setRecipient("all")}
            className="font-semibold text-primary underline underline-offset-4"
          >
            see all flowers
          </button>{" "}
          or{" "}
          <Link
            to="/order"
            search={{ suggest: true }}
            className="font-semibold text-primary underline underline-offset-4"
          >
            let us suggest one
          </Link>
          .
        </p>
      ) : (
        <ul className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {visible.map((bouquet) => (
            <li
              key={bouquet.slug}
              className="flex flex-col overflow-hidden rounded-2xl border border-border bg-card shadow-sm transition-shadow hover:shadow-md"
            >
              <Link
                to="/order"
                search={{ bouquet: bouquet.slug }}
                className="group block"
                aria-label={`Order the ${bouquet.name} bouquet, from ${bouquet.price}`}
              >
                <img
                  src={bouquet.src}
                  alt={bouquet.alt}
                  loading="lazy"
                  width={1024}
                  height={1024}
                  className="aspect-square w-full object-cover transition-transform duration-300 group-hover:scale-105"
                />
                <div className="flex items-center justify-between gap-2 px-5 pt-4">
                  <h2 className="text-xl font-semibold text-foreground">
                    {bouquet.name}
                  </h2>
                  <span className="shrink-0 rounded-full bg-accent px-2.5 py-1 text-xs font-semibold text-accent-foreground">
                    {recipientLabel[bouquet.forWho]}
                  </span>
                </div>
              </Link>
              <div className="flex flex-1 flex-col px-5 pb-5">
                <p className="mt-2 flex-1 text-sm leading-relaxed text-muted-foreground">
                  {bouquet.description}
                </p>
                <div className="mt-4 flex items-center justify-between gap-3">
                  <p className="rounded-full bg-greenery-soft px-3 py-1 text-sm font-semibold text-greenery">
                    From {bouquet.price}
                  </p>
                  <Link
                    to="/order"
                    search={{ bouquet: bouquet.slug }}
                    className="inline-flex items-center justify-center rounded-full bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground transition-colors hover:bg-primary/90"
                  >
                    Order this bouquet
                  </Link>
                </div>
              </div>
            </li>
          ))}
        </ul>
      )}

      <div className="mt-12 rounded-2xl bg-accent px-6 py-10 text-center">
        <p className="text-lg text-accent-foreground">
          Not sure which bouquet fits the moment?{" "}
          <Link
            to="/order"
            search={{ suggest: true }}
            className="font-semibold underline underline-offset-4"
          >
            Let us suggest one
          </Link>{" "}
          based on who it's for, the occasion, and your city.
        </p>
      </div>
    </div>
  );
}
