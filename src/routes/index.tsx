import { createFileRoute, Link } from "@tanstack/react-router";
import { Sparkles, Truck, MapPin, HeartHandshake, Scissors, Gift } from "lucide-react";

import heroStorefront from "@/assets/hero-storefront.jpg";
import galleryRoses from "@/assets/gallery-roses.jpg";
import gallerySunflowers from "@/assets/gallery-sunflowers.jpg";
import { BOUQUETS } from "@/lib/bouquets";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Florence Flowers — Fresh Flowers for Every Occasion" },
      {
        name: "description",
        content:
          "Brightening moments across Nigeria with fresh, beautiful flowers. Order for pickup or delivery in Lagos, Abuja, Port Harcourt, Ibadan, and Kano — Sunday to Friday.",
      },
      {
        property: "og:title",
        content: "Florence Flowers — Fresh Flowers for Every Occasion",
      },
      {
        property: "og:description",
        content:
          "Brightening moments across Nigeria with fresh, beautiful flowers. Order for pickup or delivery in Lagos, Abuja, Port Harcourt, Ibadan, and Kano — Sunday to Friday.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

// The first six bouquets double as the home-page gallery.
const GALLERY_PHOTOS = BOUQUETS.slice(0, 6);

const HOW_IT_WORKS = [
  {
    icon: Gift,
    title: "Pick or ask us",
    text: "Choose a bouquet from the catalog, or tell us the occasion and we'll suggest one.",
  },
  {
    icon: Scissors,
    title: "We craft it fresh",
    text: "Every order is arranged by hand the morning it goes out — never picked from a shelf.",
  },
  {
    icon: Truck,
    title: "We deliver it",
    text: "Delivery Sunday to Friday in Lagos, Abuja, Port Harcourt, Ibadan, and Kano.",
  },
];

const OCCASION_LINKS = [
  "Birthday",
  "Anniversary",
  "Wedding",
  "Sympathy",
  "Congratulations",
  "New Baby",
  "Valentine's Day",
  "Thank You",
];

// Sample testimonials — placeholder copy, easy to swap for real customer notes.
const TESTIMONIALS = [
  {
    quote:
      "I ordered from Abuja for my mum's birthday in Lagos and the bouquet arrived exactly as pictured — fresh and beautifully wrapped.",
    name: "Chiamaka, Abuja",
  },
  {
    quote:
      "The team helped me pick something for my husband and even wrote the card for me. Delivered the next morning, no stress.",
    name: "Fatima, Kano",
  },
  {
    quote:
      "We used Florence Flowers for our engagement flowers and the white roses were stunning. Genuinely the best in Port Harcourt.",
    name: "Emeka & Adaeze, Port Harcourt",
  },
];

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

      {/* Trust strip */}
      <section aria-label="Why order from us" className="border-b border-border bg-card">
        <ul className="mx-auto grid max-w-6xl grid-cols-1 gap-6 px-4 py-6 sm:grid-cols-3 sm:px-6">
          <li className="flex items-center justify-center gap-3 text-center sm:text-left">
            <Sparkles aria-hidden="true" className="size-5 shrink-0 text-greenery" />
            <p className="text-sm font-medium text-foreground">
              Made fresh every morning
            </p>
          </li>
          <li className="flex items-center justify-center gap-3 text-center sm:text-left">
            <Truck aria-hidden="true" className="size-5 shrink-0 text-greenery" />
            <p className="text-sm font-medium text-foreground">
              Delivery Sunday to Friday, in all five cities
            </p>
          </li>
          <li className="flex items-center justify-center gap-3 text-center sm:text-left">
            <MapPin aria-hidden="true" className="size-5 shrink-0 text-greenery" />
            <p className="text-sm font-medium text-foreground">
              Five stores: Lagos · Abuja · Port Harcourt · Ibadan · Kano
            </p>
          </li>
        </ul>
      </section>

      {/* Featured collections by recipient */}
      <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6 sm:py-20">
        <div className="text-center">
          <h2 className="text-3xl font-semibold text-foreground sm:text-4xl">
            Who are the flowers for?
          </h2>
          <p className="mx-auto mt-2 max-w-xl text-muted-foreground">
            Every bouquet is arranged with its recipient in mind. Start with
            the person, and we'll help you from there.
          </p>
        </div>
        <div className="mx-auto mt-10 grid max-w-5xl grid-cols-1 gap-8 sm:grid-cols-2">
          {[
            {
              to: "/flowers",
              search: { for: "her" as const },
              src: galleryRoses,
              alt: "Classic bouquet of deep red roses",
              title: "For her",
              text: "Romantic roses, blush lilies and soft pastels — bouquets made to spoil her.",
            },
            {
              to: "/flowers",
              search: { for: "him" as const },
              src: gallerySunflowers,
              alt: "Cheerful sunflowers and yellow daisies in a glass jar",
              title: "For him",
              text: "Bold sunflowers, cheering gerberas and lasting plants — gifts with character.",
            },
          ].map((collection) => (
            <Link
              key={collection.title}
              to={collection.to}
              search={collection.search}
              className="group relative overflow-hidden rounded-3xl border border-border shadow-sm transition-shadow hover:shadow-lg"
            >
              <img
                src={collection.src}
                alt={collection.alt}
                loading="lazy"
                width={1024}
                height={768}
                className="aspect-[4/3] w-full object-cover transition-transform duration-300 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/25 to-transparent" />
              <div className="absolute inset-x-0 bottom-0 p-6 sm:p-8">
                <h3 className="text-2xl font-semibold text-white">
                  {collection.title}
                </h3>
                <p className="mt-1 max-w-md text-sm text-white/90">
                  {collection.text}
                </p>
                <span className="mt-3 inline-block rounded-full bg-white/15 px-4 py-2 text-sm font-semibold text-white backdrop-blur transition-colors group-hover:bg-white/25">
                  Browse the collection
                </span>
              </div>
            </Link>
          ))}
        </div>
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

      {/* How ordering works */}
      <section className="bg-cream-deep/60">
        <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 sm:py-20">
          <div className="text-center">
            <h2 className="text-3xl font-semibold text-foreground sm:text-4xl">
              How ordering works
            </h2>
            <p className="mx-auto mt-2 max-w-xl text-muted-foreground">
              Simple from start to finish — and we confirm every detail with
              you before anything is arranged.
            </p>
          </div>
          <ol className="mx-auto mt-12 grid max-w-5xl gap-8 sm:grid-cols-3">
            {HOW_IT_WORKS.map((step, index) => (
              <li key={step.title} className="text-center">
                <div className="mx-auto flex size-14 items-center justify-center rounded-full bg-card shadow-sm ring-1 ring-border">
                  <step.icon aria-hidden="true" className="size-6 text-greenery" />
                </div>
                <p className="mt-4 text-xs font-semibold uppercase tracking-wider text-greenery">
                  Step {index + 1}
                </p>
                <h3 className="mt-1 text-xl font-semibold text-foreground">
                  {step.title}
                </h3>
                <p className="mx-auto mt-2 max-w-xs text-sm leading-relaxed text-muted-foreground">
                  {step.text}
                </p>
              </li>
            ))}
          </ol>
          <div className="mt-12 text-center">
            <Link
              to="/order"
              className="inline-flex items-center justify-center rounded-full bg-primary px-8 py-3 text-sm font-semibold text-primary-foreground shadow-sm transition-colors hover:bg-primary/90"
            >
              Start an order
            </Link>
          </div>
        </div>
      </section>

      {/* Occasions quick-pick */}
      <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6 sm:py-20">
        <div className="text-center">
          <h2 className="text-3xl font-semibold text-foreground sm:text-4xl">
            Shop by occasion
          </h2>
          <p className="mx-auto mt-2 max-w-xl text-muted-foreground">
            Whatever the moment, there's a bouquet for it.
          </p>
        </div>
        <ul className="mx-auto mt-8 flex max-w-3xl flex-wrap justify-center gap-3">
          {OCCASION_LINKS.map((occasion) => (
            <li key={occasion}>
              <Link
                to="/occasions"
                className="inline-flex items-center rounded-full border border-border bg-card px-4 py-2 text-sm font-medium text-foreground transition-colors hover:bg-accent"
              >
                {occasion}
              </Link>
            </li>
          ))}
          <li>
            <Link
              to="/occasions"
              className="inline-flex items-center rounded-full bg-accent px-4 py-2 text-sm font-semibold text-accent-foreground transition-colors hover:bg-accent/80"
            >
              See all occasions
            </Link>
          </li>
        </ul>
      </section>

      {/* Testimonials */}
      <section className="border-y border-border bg-card">
        <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 sm:py-20">
          <div className="text-center">
            <h2 className="text-3xl font-semibold text-foreground sm:text-4xl">
              Words from our customers
            </h2>
            <p className="mx-auto mt-2 max-w-xl text-muted-foreground">
              A few notes from people we've had the joy of serving.
            </p>
          </div>
          <ul className="mx-auto mt-10 grid max-w-5xl gap-6 md:grid-cols-3">
            {TESTIMONIALS.map((testimonial) => (
              <li
                key={testimonial.name}
                className="flex flex-col rounded-2xl border border-border bg-background p-6 shadow-sm"
              >
                <HeartHandshake
                  aria-hidden="true"
                  className="size-6 text-blush-deep"
                />
                <blockquote className="mt-4 flex-1 text-sm leading-relaxed text-foreground">
                  "{testimonial.quote}"
                </blockquote>
                <p className="mt-4 text-sm font-semibold text-muted-foreground">
                  {testimonial.name}
                </p>
              </li>
            ))}
          </ul>
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
