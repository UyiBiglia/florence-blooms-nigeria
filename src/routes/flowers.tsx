import { createFileRoute, Link } from "@tanstack/react-router";

import { BOUQUETS } from "@/lib/bouquets";

export const Route = createFileRoute("/flowers")({
  head: () => ({
    meta: [
      { title: "Fresh Flowers & Bouquets — Florence Flowers" },
      {
        name: "description",
        content:
          "Browse our bouquets and arrangements — from ₦18,000 — and order for delivery in Lagos, Abuja, Port Harcourt, Ibadan, or Kano. We deliver Sunday to Friday.",
      },
      {
        property: "og:title",
        content: "Fresh Flowers & Bouquets — Florence Flowers",
      },
      {
        property: "og:description",
        content:
          "Browse our bouquets and arrangements — from ₦18,000 — and order for delivery in Lagos, Abuja, Port Harcourt, Ibadan, or Kano. We deliver Sunday to Friday.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: FlowersPage,
});

function FlowersPage() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-14 sm:px-6">
      <header className="max-w-2xl">
        <h1 className="text-4xl font-semibold text-foreground sm:text-5xl">
          Fresh Flowers &amp; Bouquets
        </h1>
        <p className="mt-3 text-lg text-muted-foreground">
          Made fresh every morning and delivered Sunday to Friday in all five
          cities. Prices are starting points — we'll confirm the final details
          with you.
        </p>
      </header>

      <ul className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {BOUQUETS.map((bouquet) => (
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
              <h2 className="px-5 pt-4 text-xl font-semibold text-foreground">
                {bouquet.name}
              </h2>
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
          based on your occasion and city.
        </p>
      </div>
    </div>
  );
}
