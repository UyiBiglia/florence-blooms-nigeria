import { useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { CalendarIcon } from "lucide-react";

import { isBlockedDeliveryDate, startOfToday } from "@/lib/delivery";
import { BOUQUETS, getBouquet, suggestBouquet, type Bouquet, type Recipient } from "@/lib/bouquets";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

export const Route = createFileRoute("/order")({
  validateSearch: (search: Record<string, unknown>) => ({
    bouquet: typeof search.bouquet === "string" ? search.bouquet : undefined,
    suggest:
      search.suggest === "1" || search.suggest === true ? true : undefined,
  }),
  head: () => ({
    meta: [
      { title: "Order Flowers — Florence Flowers" },
      {
        name: "description",
        content:
          "Request a bouquet or arrangement for delivery in Lagos, Abuja, Port Harcourt, Ibadan, or Kano. We deliver Sunday to Friday — not on Saturdays.",
      },
      { property: "og:title", content: "Order Flowers — Florence Flowers" },
      {
        property: "og:description",
        content:
          "Request a bouquet or arrangement for delivery in Lagos, Abuja, Port Harcourt, Ibadan, or Kano. We deliver Sunday to Friday — not on Saturdays.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: OrderPage,
});

const CITIES = [
  "Lagos",
  "Abuja",
  "Port Harcourt",
  "Ibadan",
  "Kano",
] as const;

const OCCASIONS = [
  "Birthday",
  "Anniversary",
  "Valentine's Day",
  "Get Well Soon",
  "Congratulations",
  "New Baby",
  "Sympathy",
  "Wedding",
  "Graduation",
  "Housewarming",
  "Thank You",
  "Other / Just Because",
] as const;

type OrderForm = {
  bouquet: string;
  name: string;
  phone: string;
  email: string;
  city: string;
  occasion: string;
  request: string;
  deliveryDate: Date | undefined;
  cardMessage: string;
};

type Stage = "choose" | "suggest" | "form";

const EMPTY_FORM: OrderForm = {
  bouquet: "",
  name: "",
  phone: "",
  email: "",
  city: "",
  occasion: "",
  request: "",
  deliveryDate: undefined,
  cardMessage: "",
};

type FieldErrors = Partial<Record<keyof OrderForm, string>>;

function validateOrder(form: OrderForm): FieldErrors {
  const errors: FieldErrors = {};
  if (!form.bouquet) errors.bouquet = "Please choose a bouquet.";
  if (!form.name.trim()) errors.name = "Please enter your full name.";
  if (!form.phone.trim()) errors.phone = "Please enter a phone number.";
  if (!form.email.trim()) {
    errors.email = "Please enter your email.";
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email.trim())) {
    errors.email = "That email doesn't look right — please check it.";
  }
  if (!form.city) errors.city = "Please choose a city.";
  if (!form.occasion) errors.occasion = "Please choose an occasion.";
  if (!form.request.trim())
    errors.request =
      "Tell us what you have in mind — a style, colours, or flowers you like.";
  if (!form.deliveryDate) {
    errors.deliveryDate = "Please pick a delivery date.";
  } else if (isBlockedDeliveryDate(form.deliveryDate)) {
    errors.deliveryDate =
      "We don't deliver on Saturdays — please pick another day.";
  }
  return errors;
}

function formatDeliveryDate(date: Date): string {
  return date.toLocaleDateString("en-NG", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

const inputClass =
  "w-full rounded-md border border-input bg-background px-3 py-2 text-sm text-foreground shadow-sm transition-colors placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring";

function ErrorText({ id, message }: { id: string; message?: string }) {
  if (!message) return null;
  return (
    <p id={id} className="mt-1 text-sm text-destructive">
      {message}
    </p>
  );
}

function OrderPage() {
  const { bouquet: bouquetParam, suggest: suggestParam } = Route.useSearch();
  const requestedBouquet = getBouquet(bouquetParam);

  const [stage, setStage] = useState<Stage>(() => {
    if (requestedBouquet) return "form";
    if (suggestParam) return "suggest";
    return "choose";
  });
  const [form, setForm] = useState<OrderForm>(() => ({
    ...EMPTY_FORM,
    bouquet: requestedBouquet?.slug ?? "",
  }));
  const [errors, setErrors] = useState<FieldErrors>({});
  const [submitted, setSubmitted] = useState<OrderForm | null>(null);
  const [datePickerOpen, setDatePickerOpen] = useState(false);
  const [suggestion, setSuggestion] = useState<Bouquet | null>(null);
  const [suggestionInputs, setSuggestionInputs] = useState<{
    occasion: string;
    city: string;
    recipient: Recipient;
  }>({
    occasion: "",
    city: "",
    recipient: "anyone",
  });
  const today = startOfToday();

  const update = <K extends keyof OrderForm>(field: K, value: OrderForm[K]) => {
    setForm((prev) => ({ ...prev, [field]: value }));
    setErrors((prev) => (prev[field] ? { ...prev, [field]: undefined } : prev));
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const found = validateOrder(form);
    setErrors(found);
    if (Object.values(found).some(Boolean)) return;
    setSubmitted(form);
  };

  const resetAll = () => {
    setForm(EMPTY_FORM);
    setErrors({});
    setSubmitted(null);
    setSuggestion(null);
    setSuggestionInputs({ occasion: "", city: "", recipient: "anyone" });
    setStage("choose");
  };

  if (submitted) {
    const bouquet = getBouquet(submitted.bouquet);
    return (
      <div className="mx-auto max-w-2xl px-4 py-14 text-center sm:px-6">
        <div
          role="status"
          aria-live="polite"
          className="rounded-2xl border border-border bg-card p-10 shadow-sm"
        >
          <div
            aria-hidden="true"
            className="mx-auto flex size-14 items-center justify-center rounded-full bg-accent text-3xl"
          >
            💐
          </div>
          <h1 className="mt-6 text-3xl font-semibold text-foreground">
            Thank you, your order request is in — we'll reach out to confirm.
          </h1>
          <p className="mt-4 text-muted-foreground">
            We'll call or email you shortly to confirm the details and arrange
            payment. Here's what we received:
          </p>
          <dl className="mt-6 space-y-2 rounded-xl bg-accent/60 p-6 text-left text-sm text-accent-foreground">
            {bouquet ? (
              <div>
                <dt className="inline font-semibold">Bouquet: </dt>
                <dd className="inline">{bouquet.name}</dd>
              </div>
            ) : null}
            <div>
              <dt className="inline font-semibold">Name: </dt>
              <dd className="inline">{submitted.name}</dd>
            </div>
            <div>
              <dt className="inline font-semibold">Phone: </dt>
              <dd className="inline">{submitted.phone}</dd>
            </div>
            <div>
              <dt className="inline font-semibold">Email: </dt>
              <dd className="inline">{submitted.email}</dd>
            </div>
            <div>
              <dt className="inline font-semibold">City: </dt>
              <dd className="inline">{submitted.city}</dd>
            </div>
            <div>
              <dt className="inline font-semibold">Occasion: </dt>
              <dd className="inline">{submitted.occasion}</dd>
            </div>
            <div>
              <dt className="inline font-semibold">Your request: </dt>
              <dd className="inline">{submitted.request}</dd>
            </div>
            {submitted.deliveryDate ? (
              <div>
                <dt className="inline font-semibold">Delivery date: </dt>
                <dd className="inline">
                  {formatDeliveryDate(submitted.deliveryDate)}
                </dd>
              </div>
            ) : null}
            {submitted.cardMessage.trim() ? (
              <div>
                <dt className="inline font-semibold">Card message: </dt>
                <dd className="inline">"{submitted.cardMessage}"</dd>
              </div>
            ) : null}
          </dl>
          <button
            type="button"
            onClick={resetAll}
            className="mt-8 inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
          >
            Place another order request
          </button>
        </div>
      </div>
    );
  }

  if (stage === "choose") {
    return (
      <div className="mx-auto max-w-3xl px-4 py-14 sm:px-6">
        <h1 className="text-4xl font-semibold text-foreground sm:text-5xl">
          Order Flowers
        </h1>
        <p className="mt-3 text-lg text-muted-foreground">
          How would you like to start? We deliver Sunday to Friday in Lagos,
          Abuja, Port Harcourt, Ibadan, and Kano.
        </p>

        <div className="mt-8 grid gap-4 sm:grid-cols-2">
          <button
            type="button"
            onClick={() => setStage("form")}
            className="rounded-2xl border border-border bg-card p-6 text-left shadow-sm transition-shadow hover:shadow-md"
          >
            <h2 className="text-xl font-semibold text-primary">
              I know what I want
            </h2>
            <p className="mt-2 text-muted-foreground">
              Pick a bouquet from our catalog and fill in the delivery
              details.
            </p>
          </button>
          <button
            type="button"
            onClick={() => setStage("suggest")}
            className="rounded-2xl border border-border bg-card p-6 text-left shadow-sm transition-shadow hover:shadow-md"
          >
            <h2 className="text-xl font-semibold text-primary">
              I don't have anything in mind yet
            </h2>
            <p className="mt-2 text-muted-foreground">
              Tell us the occasion and city, and we'll suggest a bouquet for
              you.
            </p>
          </button>
        </div>

        <p className="mt-6 text-sm text-muted-foreground">
          Prefer to browse first?{" "}
          <Link
            to="/flowers"
            className="font-semibold text-primary underline underline-offset-4"
          >
            See the full flowers catalog
          </Link>
          .
        </p>
      </div>
    );
  }

  if (stage === "suggest") {
    return (
      <div className="mx-auto max-w-2xl px-4 py-14 sm:px-6">
        <h1 className="text-4xl font-semibold text-foreground sm:text-5xl">
          Let us suggest a bouquet
        </h1>
        <p className="mt-3 text-lg text-muted-foreground">
          Tell us who it's for, the occasion, and where it's going — we'll
          point you to something fitting.
        </p>

        <form
          onSubmit={(event) => {
            event.preventDefault();
            if (suggestionInputs.occasion) {
              setSuggestion(
                suggestBouquet(suggestionInputs.occasion, suggestionInputs.recipient),
              );
            }
          }}
          className="mt-8 space-y-6 rounded-2xl border border-border bg-card p-6 shadow-sm sm:p-8"
        >
          <div className="grid gap-6 sm:grid-cols-3">
            <div>
              <label
                htmlFor="suggest-recipient"
                className="mb-1.5 block text-sm font-semibold text-foreground"
              >
                Who is it for?
              </label>
              <select
                id="suggest-recipient"
                value={suggestionInputs.recipient}
                onChange={(e) =>
                  setSuggestionInputs((prev) => ({
                    ...prev,
                    recipient: e.target.value as Recipient,
                  }))
                }
                className={inputClass}
              >
                <option value="her">For her</option>
                <option value="him">For him</option>
                <option value="anyone">Either is fine</option>
              </select>
            </div>
            <div>
              <label
                htmlFor="suggest-occasion"
                className="mb-1.5 block text-sm font-semibold text-foreground"
              >
                Occasion
              </label>
              <select
                id="suggest-occasion"
                required
                value={suggestionInputs.occasion}
                onChange={(e) =>
                  setSuggestionInputs((prev) => ({
                    ...prev,
                    occasion: e.target.value,
                  }))
                }
                className={inputClass}
              >
                <option value="" disabled>
                  Choose an occasion
                </option>
                {OCCASIONS.map((occasion) => (
                  <option key={occasion} value={occasion}>
                    {occasion}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label
                htmlFor="suggest-city"
                className="mb-1.5 block text-sm font-semibold text-foreground"
              >
                Delivery city
              </label>
              <select
                id="suggest-city"
                required
                value={suggestionInputs.city}
                onChange={(e) =>
                  setSuggestionInputs((prev) => ({
                    ...prev,
                    city: e.target.value,
                  }))
                }
                className={inputClass}
              >
                <option value="" disabled>
                  Choose a city
                </option>
                {CITIES.map((city) => (
                  <option key={city} value={city}>
                    {city}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <button
            type="submit"
            className="inline-flex w-full items-center justify-center rounded-full bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground shadow-sm transition-colors hover:bg-primary/90 sm:w-auto"
          >
            Show my suggestion
          </button>
        </form>

        <div aria-live="polite">
          {suggestion ? (
            <div className="mt-8 overflow-hidden rounded-2xl border border-border bg-card shadow-sm">
              <img
                src={suggestion.src}
                alt={suggestion.alt}
                loading="lazy"
                width={1024}
                height={1024}
                className="aspect-[16/9] w-full object-cover"
              />
              <div className="p-6">
                <p className="text-sm font-medium text-greenery">
                  We suggest ·{" "}
                  {suggestionInputs.recipient === "her"
                    ? "a gift for her"
                    : suggestionInputs.recipient === "him"
                      ? "a gift for him"
                      : "for anyone"}
                </p>
                <h2 className="mt-1 text-2xl font-semibold text-foreground">
                  {suggestion.name}
                </h2>
                <p className="mt-2 text-muted-foreground">
                  {suggestion.description} From {suggestion.price}
                  {suggestionInputs.city
                    ? ` — ready for delivery in ${suggestionInputs.city}.`
                    : "."}
                </p>
                <div className="mt-4 flex flex-wrap gap-3">
                  <button
                    type="button"
                    onClick={() => {
                      setForm((prev) => ({
                        ...prev,
                        bouquet: suggestion.slug,
                      }));
                      setStage("form");
                    }}
                    className="inline-flex items-center justify-center rounded-full bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground shadow-sm transition-colors hover:bg-primary/90"
                  >
                    Order this bouquet
                  </button>
                  <Link
                    to="/flowers"
                    className="inline-flex items-center justify-center rounded-full border border-input bg-background px-6 py-3 text-sm font-semibold text-foreground transition-colors hover:bg-accent"
                  >
                    See all flowers
                  </Link>
                </div>
              </div>
            </div>
          ) : null}
        </div>

        <p className="mt-6 text-sm text-muted-foreground">
          Changed your mind?{" "}
          <button
            type="button"
            onClick={() => setStage("choose")}
            className="font-semibold text-primary underline underline-offset-4"
          >
            Go back
          </button>
        </p>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-2xl px-4 py-14 sm:px-6">
      <h1 className="text-4xl font-semibold text-foreground sm:text-5xl">
        Order Flowers
      </h1>
      <p className="mt-3 text-lg text-muted-foreground">
        Tell us what you'd like and we'll get back to you to confirm your
        order. We deliver Sunday to Friday in all five cities.
      </p>

      <form
        onSubmit={handleSubmit}
        noValidate
        className="mt-8 space-y-6 rounded-2xl border border-border bg-card p-6 shadow-sm sm:p-8"
      >
        <div>
          <label
            htmlFor="order-bouquet"
            className="mb-1.5 block text-sm font-semibold text-foreground"
          >
            Bouquet
          </label>
          <select
            id="order-bouquet"
            required
            aria-invalid={errors.bouquet ? true : undefined}
            aria-describedby={errors.bouquet ? "order-bouquet-error" : undefined}
            value={form.bouquet}
            onChange={(e) => update("bouquet", e.target.value)}
            className={inputClass}
          >
            <option value="" disabled>
              Choose a bouquet
            </option>
            {BOUQUETS.map((bouquet) => (
              <option key={bouquet.slug} value={bouquet.slug}>
                {bouquet.name} — from {bouquet.price}
              </option>
            ))}
          </select>
          <p className="mt-1.5 text-sm text-muted-foreground">
            Not sure?{" "}
            <Link
              to="/flowers"
              className="font-medium text-primary underline underline-offset-4"
            >
              Browse the catalog
            </Link>{" "}
            or{" "}
            <button
              type="button"
              onClick={() => setStage("suggest")}
              className="font-medium text-primary underline underline-offset-4"
            >
              let us suggest one
            </button>
            .
          </p>
          <ErrorText id="order-bouquet-error" message={errors.bouquet} />
        </div>

        <div className="grid gap-6 sm:grid-cols-2">
          <div>
            <label
              htmlFor="order-name"
              className="mb-1.5 block text-sm font-semibold text-foreground"
            >
              Full name
            </label>
            <input
              id="order-name"
              type="text"
              required
              autoComplete="name"
              aria-invalid={errors.name ? true : undefined}
              aria-describedby={errors.name ? "order-name-error" : undefined}
              value={form.name}
              onChange={(e) => update("name", e.target.value)}
              placeholder="Ada Okonkwo"
              className={inputClass}
            />
            <ErrorText id="order-name-error" message={errors.name} />
          </div>
          <div>
            <label
              htmlFor="order-phone"
              className="mb-1.5 block text-sm font-semibold text-foreground"
            >
              Phone number
            </label>
            <input
              id="order-phone"
              type="tel"
              required
              autoComplete="tel"
              aria-invalid={errors.phone ? true : undefined}
              aria-describedby={errors.phone ? "order-phone-error" : undefined}
              value={form.phone}
              onChange={(e) => update("phone", e.target.value)}
              placeholder="+234 800 000 0000"
              className={inputClass}
            />
            <ErrorText id="order-phone-error" message={errors.phone} />
          </div>
        </div>

        <div>
          <label
            htmlFor="order-email"
            className="mb-1.5 block text-sm font-semibold text-foreground"
          >
            Email
          </label>
          <input
            id="order-email"
            type="email"
            required
            autoComplete="email"
            aria-invalid={errors.email ? true : undefined}
            aria-describedby={errors.email ? "order-email-error" : undefined}
            value={form.email}
            onChange={(e) => update("email", e.target.value)}
            placeholder="you@example.com"
            className={inputClass}
          />
          <ErrorText id="order-email-error" message={errors.email} />
        </div>

        <div className="grid gap-6 sm:grid-cols-2">
          <div>
            <label
              htmlFor="order-city"
              className="mb-1.5 block text-sm font-semibold text-foreground"
            >
              City
            </label>
            <select
              id="order-city"
              required
              aria-invalid={errors.city ? true : undefined}
              aria-describedby={errors.city ? "order-city-error" : undefined}
              value={form.city}
              onChange={(e) => update("city", e.target.value)}
              className={inputClass}
            >
              <option value="" disabled>
                Choose a city
              </option>
              {CITIES.map((city) => (
                <option key={city} value={city}>
                  {city}
                </option>
              ))}
            </select>
            <ErrorText id="order-city-error" message={errors.city} />
          </div>
          <div>
            <label
              htmlFor="order-occasion"
              className="mb-1.5 block text-sm font-semibold text-foreground"
            >
              Occasion
            </label>
            <select
              id="order-occasion"
              required
              aria-invalid={errors.occasion ? true : undefined}
              aria-describedby={
                errors.occasion ? "order-occasion-error" : undefined
              }
              value={form.occasion}
              onChange={(e) => update("occasion", e.target.value)}
              className={inputClass}
            >
              <option value="" disabled>
                Choose an occasion
              </option>
              {OCCASIONS.map((occasion) => (
                <option key={occasion} value={occasion}>
                  {occasion}
                </option>
              ))}
            </select>
            <ErrorText id="order-occasion-error" message={errors.occasion} />
          </div>
        </div>

        <div>
          <label
            htmlFor="order-request"
            className="mb-1.5 block text-sm font-semibold text-foreground"
          >
            What would you like?
          </label>
          <textarea
            id="order-request"
            rows={3}
            required
            aria-invalid={errors.request ? true : undefined}
            aria-describedby={errors.request ? "order-request-error" : undefined}
            value={form.request}
            onChange={(e) => update("request", e.target.value)}
            placeholder="A bouquet style, colours, or just tell us what you have in mind — e.g. 'bright mixed flowers in kraft wrap, around ₦25,000'"
            className={inputClass}
          />
          <ErrorText id="order-request-error" message={errors.request} />
        </div>

        <div>
          <label
            htmlFor="order-delivery-date-button"
            className="mb-1.5 block text-sm font-semibold text-foreground"
          >
            Delivery date
          </label>
          <Popover open={datePickerOpen} onOpenChange={setDatePickerOpen}>
            <PopoverTrigger asChild>
              <Button
                id="order-delivery-date-button"
                type="button"
                variant="outline"
                className="w-full justify-start border-input bg-background px-3 py-2 font-normal text-muted-foreground shadow-sm hover:bg-accent"
              >
                <CalendarIcon className="mr-2 size-4" aria-hidden="true" />
                {form.deliveryDate
                  ? formatDeliveryDate(form.deliveryDate)
                  : "Pick a delivery date"}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="start">
              <Calendar
                mode="single"
                selected={form.deliveryDate}
                onSelect={(date) => {
                  update("deliveryDate", date ?? undefined);
                  setDatePickerOpen(false);
                }}
                disabled={[{ before: today }, { dayOfWeek: [6] }]}
                initialFocus
                className="pointer-events-auto p-3"
              />
            </PopoverContent>
          </Popover>
          <p id="order-delivery-date-hint" className="mt-1.5 text-sm text-muted-foreground">
            We don't deliver on Saturdays — Saturdays are marked as unavailable
            in the calendar.
          </p>
          <ErrorText
            id="order-delivery-date-error"
            message={errors.deliveryDate}
          />
        </div>

        <div>
          <label
            htmlFor="order-card-message"
            className="mb-1.5 block text-sm font-semibold text-foreground"
          >
            Card message{" "}
            <span className="font-normal text-muted-foreground">
              (optional)
            </span>
          </label>
          <textarea
            id="order-card-message"
            rows={2}
            value={form.cardMessage}
            onChange={(e) => update("cardMessage", e.target.value)}
            placeholder="A short note to write on the card, e.g. 'Happy birthday, Mum!'"
            className={inputClass}
          />
        </div>

        <button
          type="submit"
          className="inline-flex w-full items-center justify-center rounded-full bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground shadow-sm transition-colors hover:bg-primary/90 sm:w-auto"
        >
          Send order request
        </button>
        <p className="text-sm text-muted-foreground">
          Sending this doesn't charge you anything — we'll confirm your order
          and arrange payment together.
        </p>
      </form>

      <p className="mt-6 text-sm text-muted-foreground">
        <button
          type="button"
          onClick={() => setStage("choose")}
          className="font-semibold text-primary underline underline-offset-4"
        >
          Go back to the order options
        </button>
      </p>
    </div>
  );
}
