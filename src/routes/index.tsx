import { createFileRoute, Link } from "@tanstack/react-router";

import heroStorefront from "@/assets/hero-storefront.jpg";
import galleryBirthday from "@/assets/gallery-birthday.jpg";
import galleryWedding from "@/assets/gallery-wedding.jpg";
import gallerySunflowers from "@/assets/gallery-sunflowers.jpg";
import galleryRoses from "@/assets/gallery-roses.jpg";
import galleryPastels from "@/assets/gallery-pastels.jpg";
import galleryPlant from "@/assets/gallery-plant.jpg";

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

const GALLERY_PHOTOS = [
  { src: galleryBirthday, alt: "Bright, joyful mixed bouquet wrapped in kraft paper", name: "Birthday Cheer", price: "₦25,000" },
  { src: galleryWedding, alt: "Elegant white rose and peony wedding bouquet", name: "Bridal White", price: "₦75,000" },
  { src: gallerySunflowers, alt: "Cheerful sunflowers and yellow daisies in a glass jar", name: "Sunflower Smile", price: "₦18,000" },
  { src: galleryRoses, alt: "Classic bouquet of deep red roses", name: "Classic Red Roses", price: "₦35,000" },
  { src: galleryPastels, alt: "Soft pastel basket of pink and blue roses with baby's breath", name: "Pastel Basket", price: "₦28,000" },
  { src: galleryPlant, alt: "Welcoming potted plant beside a fresh mixed bouquet", name: "Green & Blooming", price: "₦22,000" },
];

export { GALLERY_PHOTOS };

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
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <Link
              to="/order"
              className="rounded-full bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground shadow-sm transition-colors hover:bg-primary/90"
            >
              Order flowers
            </Link>
            <Link
              to="/occasions"
              className="rounded-full border border-white/40 bg-black/25 px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-black/40"
            >
              Browse by occasion
            </Link>
            <Link
              to="/locations"
              className="rounded-full border border-white/40 bg-black/25 px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-black/40"
            >
              Find a store
            </Link>
          </div>
        </div>
      </section>

      {/* Intro */}
      <section className="mx-auto max-w-3xl px-4 py-14 text-center sm:px-6">
        <p className="text-lg leading-relaxed text-foreground sm:text-xl">
          From birthday bouquets to wedding arrangements, we help you say it
          with flowers. Order for pickup or delivery in Lagos, Abuja, Port
          Harcourt, Ibadan, and Kano.
        </p>
      </section>

      {/* Flower gallery */}
      <section className="mx-auto max-w-6xl px-4 pb-14 sm:px-6">
        <h2 className="text-center text-3xl font-semibold text-foreground">
          Our flowers
        </h2>
        <p className="mt-2 text-center text-muted-foreground">
          Bouquets and arrangements, made fresh every morning.
        </p>
        <ul className="mx-auto mt-8 grid max-w-5xl grid-cols-1 gap-6 sm:grid-cols-2">
          {GALLERY_PHOTOS.map((photo) => (
            <li
              key={photo.src}
              className="group overflow-hidden rounded-2xl border border-border bg-card shadow-sm"
            >
              <img
                src={photo.src}
                alt={photo.alt}
                loading="lazy"
                width={1024}
                height={1024}
                className="aspect-square w-full object-cover transition-transform duration-300 group-hover:scale-105"
              />
              <div className="flex items-center justify-between gap-3 px-5 py-4">
                <p className="text-base font-semibold text-foreground">
                  {photo.name}
                </p>
                <p className="rounded-full bg-accent px-3 py-1 text-sm font-semibold text-accent-foreground">
                  From {photo.price}
                </p>
              </div>
            </li>
          ))}
        </ul>
      </section>

      {/* Closing call to action */}
      <section className="bg-cream-deep/60">
        <div className="mx-auto max-w-3xl px-4 py-14 text-center sm:px-6">
          <p className="text-lg text-foreground">
            Ready to send flowers?{" "}
            <Link
              to="/order"
              className="font-semibold text-primary underline underline-offset-4 hover:text-blush-deep"
            >
              Place an order
            </Link>{" "}
            for delivery in any of our five cities, explore our{" "}
            <Link
              to="/occasions"
              className="font-semibold text-primary underline underline-offset-4 hover:text-blush-deep"
            >
              Occasions
            </Link>{" "}
            page, or{" "}
            <Link
              to="/contact"
              className="font-semibold text-primary underline underline-offset-4 hover:text-blush-deep"
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
