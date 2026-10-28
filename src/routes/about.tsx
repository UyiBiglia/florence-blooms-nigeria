import { createFileRoute, Link } from "@tanstack/react-router";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About Florence Flowers" },
      {
        name: "description",
        content:
          "Florence Flowers serves customers in five Nigerian cities — Lagos, Abuja, Port Harcourt, Ibadan, and Kano — with fresh bouquets, honest advice, and a warm smile.",
      },
      { property: "og:title", content: "About Florence Flowers" },
      {
        property: "og:description",
        content:
          "Florence Flowers serves customers in five Nigerian cities — Lagos, Abuja, Port Harcourt, Ibadan, and Kano — with fresh bouquets, honest advice, and a warm smile.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: About,
});

function About() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-14 sm:px-6">
      <h1 className="text-4xl font-semibold text-foreground sm:text-5xl">
        About Florence Flowers
      </h1>

      <div className="mt-8 space-y-6 text-lg leading-relaxed text-foreground">
        <p>
          Florence Flowers began with a simple belief: every meaningful moment
          deserves beautiful flowers.
        </p>
        <p>
          Today we serve customers in five Nigerian cities — Lagos, Abuja, Port
          Harcourt, Ibadan, and Kano — with fresh bouquets and arrangements for
          birthdays, weddings, anniversaries, and every occasion in between.
        </p>
        <p>
          Our team helps you choose flowers that say exactly what you mean. We
          can explain what each flower means in simple language, match colours
          and budgets to your needs, and deliver anywhere in our five cities.
        </p>
        <p>
          Whether you walk into one of our stores or ask us for a
          recommendation, you'll get the same thing: fresh flowers, honest
          advice, and a warm smile.
        </p>
      </div>

      <div className="mt-12 rounded-2xl bg-accent px-6 py-10 text-center">
        <p className="text-lg text-accent-foreground">
          Planning a visit?{" "}
          <Link
            to="/locations"
            className="font-semibold underline underline-offset-4 hover:text-primary"
          >
            See our five locations
          </Link>
          , or{" "}
          <Link
            to="/contact"
            className="font-semibold underline underline-offset-4 hover:text-primary"
          >
            get in touch
          </Link>
          .
        </p>
      </div>
    </div>
  );
}
