import { createFileRoute, Link } from "@tanstack/react-router";

export const Route = createFileRoute("/locations")({
  head: () => ({
    meta: [
      { title: "Our Locations — Florence Flowers" },
      {
        name: "description",
        content:
          "Visit Florence Flowers in Lagos, Abuja, Port Harcourt, Ibadan, or Kano. All stores are open Sunday to Friday and closed on Saturdays and Nigerian federal public holidays.",
      },
      { property: "og:title", content: "Our Locations — Florence Flowers" },
      {
        property: "og:description",
        content:
          "Visit Florence Flowers in Lagos, Abuja, Port Harcourt, Ibadan, or Kano. All stores are open Sunday to Friday and closed on Saturdays and Nigerian federal public holidays.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Locations,
});

const LOCATIONS = [
  {
    city: "Lagos",
    address: "22 Adeola Odeku Street, Victoria Island, Lagos",
    phone: "+234 802 555 5555",
    hours: "Sunday to Friday, 10 am – 5 pm",
  },
  {
    city: "Abuja",
    address: "Plot 14 Ahmadu Bello Way, Garki, Abuja, FCT",
    phone: "+234 803 555 5555",
    hours: "Sunday to Friday, 9 am – 6 pm",
  },
  {
    city: "Port Harcourt",
    address: "17 Aba Road, Port Harcourt, Rivers State",
    phone: "+234 805 555 5555",
    hours: "Sunday to Friday, 10 am – 6 pm",
  },
  {
    city: "Ibadan",
    address: "8 Ring Road, Challenge, Ibadan, Oyo State",
    phone: "+234 807 555 5555",
    hours: "Sunday to Friday, 10 am – 5:45 pm",
  },
  {
    city: "Kano",
    address: "45 Zoo Road, Kano",
    phone: "+234 806 555 5555",
    hours: "Sunday to Friday, 10 am – 5 pm",
  },
];

function Locations() {
  return (
    <div className="mx-auto max-w-5xl px-4 py-14 sm:px-6">
      <header className="max-w-2xl">
        <h1 className="text-4xl font-semibold text-foreground sm:text-5xl">
          Our Locations
        </h1>
        <p className="mt-3 text-lg text-muted-foreground">
          Visit us in any of our five cities. All stores are open Sunday to
          Friday and closed on Saturdays and Nigerian federal public holidays.
        </p>
      </header>

      <ul className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {LOCATIONS.map((location) => (
          <li
            key={location.city}
            className="rounded-2xl border border-border bg-card p-6 shadow-sm"
          >
            <h2 className="font-display text-2xl font-semibold text-primary">
              {location.city}
            </h2>
            <p className="mt-3 leading-relaxed text-foreground">
              {location.address}
            </p>
            <p className="mt-2 text-foreground">
              Phone:{" "}
              <a
                href={`tel:${location.phone.replace(/\s/g, "")}`}
                className="font-medium underline underline-offset-4 hover:text-primary"
              >
                {location.phone}
              </a>
            </p>
            <p className="mt-2 text-foreground">
              <span className="font-semibold text-secondary">Hours:</span>{" "}
              {location.hours}
            </p>
          </li>
        ))}
      </ul>

      <div className="mt-12 rounded-2xl bg-accent px-6 py-10 text-center">
        <p className="text-lg text-accent-foreground">
          Deciding which bouquet to bring?{" "}
          <Link
            to="/occasions"
            className="font-semibold underline underline-offset-4 hover:text-primary"
          >
            Browse our occasions guide
          </Link>{" "}
          or{" "}
          <Link
            to="/contact"
            className="font-semibold underline underline-offset-4 hover:text-primary"
          >
            contact us
          </Link>
          .
        </p>
      </div>
    </div>
  );
}
