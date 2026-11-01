import { createFileRoute, Link } from "@tanstack/react-router";

export const Route = createFileRoute("/occasions")({
  head: () => ({
    meta: [
      { title: "Flowers for Every Occasion — Florence Flowers" },
      {
        name: "description",
        content:
          "A bouquet guide by occasion: birthday, thank you, anniversary, Valentine's Day, get well soon, congratulations, new baby, sympathy, wedding, graduation, housewarming, and just because.",
      },
      { property: "og:title", content: "Flowers for Every Occasion — Florence Flowers" },
      {
        property: "og:description",
        content:
          "A bouquet guide by occasion: birthday, thank you, anniversary, Valentine's Day, get well soon, congratulations, new baby, sympathy, wedding, graduation, housewarming, and just because.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Occasions,
});

const OCCASIONS: { title: string; body: string }[] = [
  {
    title: "Anniversary",
    body: "Classic red roses, or an elegant mixed bouquet of roses and lilies.",
  },
  {
    title: "Birthday",
    body: "Bright, joyful bouquets to make their day. Tell us who it's for and we'll suggest something perfect.",
  },
  {
    title: "Valentine's Day",
    body: "Romantic red or pink roses, tulips, or a heart-shaped arrangement.",
  },
  {
    title: "Get Well Soon",
    body: "Cheerful sunflowers, daisies, and yellow tulips to lift their spirits.",
  },
  {
    title: "Congratulations",
    body: "Bold gerbera daisies, lilies, and vibrant mixed bouquets.",
  },
  {
    title: "New Baby",
    body: "Soft pastels: pink or blue roses, carnations, and baby's breath.",
  },
  {
    title: "Sympathy",
    body: "Peaceful white lilies, chrysanthemums, and calm white arrangements.",
  },
  {
    title: "Wedding",
    body: "White roses, peonies, and elegant seasonal flowers for the big day.",
  },
  {
    title: "Graduation",
    body: "Sunflowers or bold mixed bouquets in your school's colours.",
  },
  {
    title: "Housewarming",
    body: "A welcoming potted plant or a fresh mixed bouquet.",
  },
  {
    title: "Other / Just Because",
    body: "Sometimes the best bouquet needs no occasion at all. Tell us the moment and we'll put together something fitting.",
  },
];

function Occasions() {
  return (
    <div className="mx-auto max-w-5xl px-4 py-14 sm:px-6">
      <header className="max-w-2xl">
        <h1 className="text-4xl font-semibold text-foreground sm:text-5xl">
          Flowers for Every Occasion
        </h1>
        <p className="mt-3 text-lg text-muted-foreground">
          Whatever you're celebrating — or comforting — we have the
          arrangement.
        </p>
      </header>

      <ul className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-2">
        {OCCASIONS.map((occasion) => (
          <li
            key={occasion.title}
            className="rounded-2xl border border-border bg-card p-6 shadow-sm transition-shadow hover:shadow-md"
          >
            <h2 className="text-xl font-semibold text-secondary">
              {occasion.title}
            </h2>
            <p className="mt-2 leading-relaxed text-foreground">
              {occasion.body}
            </p>
          </li>
        ))}
      </ul>

      <div className="mt-12 rounded-2xl bg-accent px-6 py-10 text-center">
        <p className="text-lg text-accent-foreground">
          Not sure what to choose?{" "}
          <Link
            to="/order"
            search={{ suggest: true }}
            className="font-semibold underline underline-offset-4 hover:text-primary"
          >
            Let us suggest a bouquet
          </Link>{" "}
          based on your occasion and delivery city.
        </p>
      </div>
    </div>
  );
}
