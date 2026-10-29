import { useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { CalendarIcon } from "lucide-react";

import { isBlockedDeliveryDate, startOfToday } from "@/lib/delivery";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

export const Route = createFileRoute("/order")({
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
  "Other/Just Because",
] as const;

type OrderForm = {
  name: string;
  phone: string;
  email: string;
  city: string;
  occasion: string;
  request: string;
  deliveryDate: Date | undefined;
  cardMessage: string;
};

const EMPTY_FORM: OrderForm = {
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

function OrderPage() {
  const [form, setForm] = useState<OrderForm>(EMPTY_FORM);
  const [errors, setErrors] = useState<FieldErrors>({});
  const [submitted, setSubmitted] = useState<OrderForm | null>(null);
  const [datePickerOpen, setDatePickerOpen] = useState(false);
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

  if (submitted) {
    return (
      <div className="mx-auto max-w-2xl px-4 py-14 text-center sm:px-6">
        <div className="rounded-2xl border border-border bg-card p-10 shadow-sm">
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
            onClick={() => {
              setForm(EMPTY_FORM);
              setErrors({});
              setSubmitted(null);
            }}
            className="mt-8 inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
          >
            Place another order request
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-2xl px-4 py-14 sm:px-6">
      <h1 className="text-4xl font-semibold text-foreground sm:text-5xl">
        Order Flowers
      </h1>
      <p className="mt-3 text-lg text-muted-foreground">
        Tell us what you'd like and we'll get back to you to confirm your order.
        We deliver Sunday to Friday in all five cities.
      </p>

      <form
        onSubmit={handleSubmit}
        noValidate
        className="mt-8 space-y-6 rounded-2xl border border-border bg-card p-6 shadow-sm sm:p-8"
      >
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
              value={form.name}
              onChange={(e) => update("name", e.target.value)}
              placeholder="Ada Okonkwo"
              className={inputClass}
            />
            {errors.name ? (
              <p className="mt-1 text-sm text-destructive">{errors.name}</p>
            ) : null}
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
              value={form.phone}
              onChange={(e) => update("phone", e.target.value)}
              placeholder="+234 800 000 0000"
              className={inputClass}
            />
            {errors.phone ? (
              <p className="mt-1 text-sm text-destructive">{errors.phone}</p>
            ) : null}
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
            value={form.email}
            onChange={(e) => update("email", e.target.value)}
            placeholder="you@example.com"
            className={inputClass}
          />
          {errors.email ? (
            <p className="mt-1 text-sm text-destructive">{errors.email}</p>
          ) : null}
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
            {errors.city ? (
              <p className="mt-1 text-sm text-destructive">{errors.city}</p>
            ) : null}
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
            {errors.occasion ? (
              <p className="mt-1 text-sm text-destructive">{errors.occasion}</p>
            ) : null}
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
            value={form.request}
            onChange={(e) => update("request", e.target.value)}
            placeholder="A bouquet style, colours, or just tell us what you have in mind — e.g. 'bright mixed flowers in kraft wrap, around ₦25,000'"
            className={inputClass}
          />
          {errors.request ? (
            <p className="mt-1 text-sm text-destructive">{errors.request}</p>
          ) : null}
        </div>

        <div>
          <label className="mb-1.5 block text-sm font-semibold text-foreground">
            Delivery date
          </label>
          <Popover open={datePickerOpen} onOpenChange={setDatePickerOpen}>
            <PopoverTrigger asChild>
              <Button
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
          <p className="mt-1.5 text-sm text-muted-foreground">
            We don't deliver on Saturdays — Saturdays are marked as unavailable
            in the calendar.
          </p>
          {errors.deliveryDate ? (
            <p className="mt-1 text-sm text-destructive">
              {errors.deliveryDate}
            </p>
          ) : null}
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
    </div>
  );
}
