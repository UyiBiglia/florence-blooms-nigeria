import { createFileRoute, Link } from "@tanstack/react-router";

import heroStorefront from "@/assets/hero-storefront.jpg";
import { BOUQUETS } from "@/lib/bouquets";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Florence Flowers — Fresh Flowers for Every Occasion" },
      {
        name: "description",
        content:
          "Brightening moments across Nigeria with fresh, beautiful flowers. Order for pickup or delivery in Lagos, Abuja, Port Harcourt, Ibadan, and Kano.",
      },
      {
        property: "og:title",
        content: "Florence Flowers — Fresh Flowers for Every Occasion",
      },
      {
        property: "og:description",
        content:
          "Brightening moments across Nigeria with fresh, beautiful flowers. Order for pickup or delivery in Lagos, Abuja, Port Harcourt, Ibadan, and Kano.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

// The first six bouquets double as the home-page gallery.
const GALLERY_PHOTOS = BOUQUETS.slice(0, 6);

function Index() {
  return (
    <>
      {/* Hero banner */}
      <section className="relative isolate">
        <img
          src={heroStorefront}
          alt="Flower shop storefront with crates of fresh bouquets in soft morning light"
          className="absolute inset-0 -z-10 h-full w-full object-cover"
          width={1920}
          height={800}
        />
        <div className="absolute inset-0 -z-10 bg-gradient-to-b from-black/60 via-black/30 to-black/70" />
        <div className="mx-auto flex max-w-6xl flex-col items-center px-4 py-24 text-center sm:px-6 sm:py-32 lg:py-40">
          <h1 className="max-w-3xl text-4xl font-semibold leading-tight text-white drop-shadow-sm sm:text-5xl lg:text-6xl">
            Florence Flowers — Fresh Flowers for Every Occasion
          </h1>
          <p className="mt-4 max-w-xl text-lg font-medium text-white/90 sm:text-xl">
            Brightening moments across Nigeria with fresh, beautiful flowers.
          </p>
          <div className="mt-8 flex flex-col items-center gap-4 sm:gap-5">
            <div className="flex flex-wrap justify-center gap-3">
              <Link
                to="/flowers"
                className="inline-flex items-center justify-center rounded-full bg-primary px-8 py-3.5 text-base font-semibold text-primary-foreground shadow-lg shadow-black/25 transition-colors hover:bg-primary/90"
              >
                Shop flowers
              </Link>
              <Link
                to="/occasions"
                className="inline-flex items-center justify-center rounded-full border border-white/40 bg-black/25 px-6 py-3.5 text-sm font-semibold text-white transition-colors hover:bg-black/40"
              >
                Browse by occasion
              </Link>
              <Link
                to="/locations"
                className="inline-flex items-center justify-center rounded-full border border-white/40 bg-black/25 px-6 py-3.5 text-sm font-semibold text-white transition-colors hover:bg-black/40"
              >
                Find a store
              </Link>
            </div>
            <Link
              to="/order"
              search={{ suggest: true }}
              className="text-sm font-semibold text-white underline decoration-white/50 underline-offset-4 transition-colors hover:decoration-white"
            >
              Not sure what you want? Let us suggest
            </Link>
          </div>
        </div>
      </section>

      {/* Intro */}
      <section className="mx-auto max-w-3xl px-4 py-16 text-center sm:px-6">
        <p className="text-lg leading-relaxed text-foreground sm:text-xl">
          From birthday bouquets to wedding arrangements, we help you say it
          with flowers. Order for pickup or delivery in Lagos, Abuja, Port
          Harcourt, Ibadan, and Kano.
        </p>
      </section>

      {/* Flower gallery */}
      <section className="mx-auto max-w-6xl px-4 pb-16 sm:px-6">
        <div className="text-center">
          <h2 className="text-3xl font-semibold text-foreground sm:text-4xl">
            Our flowers
          </h2>
          <p className="mt-2 text-muted-foreground">
            Bouquets and arrangements, made fresh every morning.
          </p>
        </div>
        <ul className="mx-auto mt-10 grid max-w-5xl grid-cols-1 gap-8 sm:grid-cols-2">
          {GALLERY_PHOTOS.map((photo) => (
            <li
              key={photo.slug}
              className="group overflow-hidden rounded-3xl border border-border bg-card shadow-sm transition-shadow hover:shadow-lg"
            >
              <Link
                to="/flowers"
                className="block"
                aria-label={`See ${photo.name} in our flowers catalog, from ${photo.price}`}
              >
                <img
                  src={photo.src}
                  alt={photo.alt}
                  loading="lazy"
                  width={1024}
                  height={1024}
                  className="aspect-square w-full object-cover transition-transform duration-300 group-hover:scale-105"
                />
              </Link>
              <div className="flex items-center justify-between gap-3 px-6 py-5">
                <div>
                  <h3 className="text-lg font-semibold text-foreground">
                    {photo.name}
                  </h3>
                  <p className="mt-0.5 line-clamp-1 text-sm text-muted-foreground">
                    {photo.description}
                  </p>
                </div>
                <p className="shrink-0 rounded-full bg-greenery-soft px-3 py-1 text-sm font-semibold text-greenery">
                  From {photo.price}
                </p>
              </div>
            </li>
          ))}
        </ul>
        <div className="mt-10 text-center">
          <Link
            to="/flowers"
            className="inline-flex items-center justify-center rounded-full bg-primary px-8 py-3 text-sm font-semibold text-primary-foreground shadow-sm transition-colors hover:bg-primary/90"
          >
            See the full catalog
          </Link>
        </div>
      </section>

      {/* Closing call to action */}
      <section className="bg-cream-deep/60">
        <div className="mx-auto max-w-3xl px-4 py-16 text-center sm:px-6">
          <p className="text-lg text-foreground">
            Ready to send flowers?{" "}
            <Link
              to="/order"
              className="font-semibold text-primary underline underline-offset-4 hover:text-greenery"
            >
              Place an order
            </Link>{" "}
            for delivery in any of our five cities, explore our{" "}
            <Link
              to="/occasions"
              className="font-semibold text-primary underline underline-offset-4 hover:text-greenery"
            >
              Occasions
            </Link>{" "}
            page, or{" "}
            <Link
              to="/contact"
              className="font-semibold text-primary underline underline-offset-4 hover:text-greenery"
            >
              Contact Us
            </Link>{" "}
            and we'll help you choose.
          </p>
        </div>
      </section>
    </>
  );
}
