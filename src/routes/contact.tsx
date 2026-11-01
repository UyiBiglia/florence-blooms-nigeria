import { createFileRoute, Link } from "@tanstack/react-router";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact Us — Florence Flowers" },
      {
        name: "description",
        content:
          "We'd love to help you find the perfect flowers. Call the Lagos head office, email us, or visit any of our five locations. Open Sunday to Friday.",
      },
      { property: "og:title", content: "Contact Us — Florence Flowers" },
      {
        property: "og:description",
        content:
          "We'd love to help you find the perfect flowers. Call the Lagos head office, email us, or visit any of our five locations. Open Sunday to Friday.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Contact,
});

function Contact() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-14 sm:px-6">
      <h1 className="text-4xl font-semibold text-foreground sm:text-5xl">
        Contact Us
      </h1>
      <p className="mt-3 text-lg text-muted-foreground">
        We'd love to help you find the perfect flowers.
      </p>

      <ul className="mt-10 space-y-5 rounded-2xl border border-border bg-card p-8 shadow-sm">
        <li>
          <span className="font-semibold text-secondary">Phone:</span>{" "}
          <a
            href="tel:+2348025555555"
            className="font-medium underline underline-offset-4 hover:text-primary"
          >
            +234 802 555 5555
          </a>{" "}
          (Lagos head office)
        </li>
        <li>
          <span className="font-semibold text-secondary">Email:</span>{" "}
          <a
            href="mailto:hello@florenceflowers.example"
            className="font-medium underline underline-offset-4 hover:text-primary"
          >
            hello@florenceflowers.example
          </a>
        </li>
        <li>
          <span className="font-semibold text-secondary">Store hours:</span>{" "}
          Sunday to Friday. Closed on Saturdays and Nigerian federal public
          holidays.
        </li>
      </ul>

      <p className="mt-8 leading-relaxed text-foreground">
        Visit any of our five locations in Lagos, Abuja, Port Harcourt, Ibadan,
        or Kano — see our{" "}
        <Link
          to="/locations"
          className="font-semibold text-primary underline underline-offset-4 hover:text-greenery"
        >
          Locations
        </Link>{" "}
        page for addresses.
      </p>

      <div className="mt-8 rounded-2xl bg-accent px-6 py-10 text-center">
        <p className="text-lg text-accent-foreground">
          Send us a message and we'll get back to you as soon as possible.
        </p>
      </div>
    </div>
  );
}
