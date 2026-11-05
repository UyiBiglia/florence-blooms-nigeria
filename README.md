# Florence Flowers 🌸

A responsive e-commerce-style website for a Nigerian flower shop, featuring a browsable bouquet catalogue, a guided order flow, and an IBM watsonx Assistant–powered chatbot for customer support.

**Live site:** https://florence-blooms-nigeria.lovable.app

---

## ✨ Features

### Catalogue

- **Flowers page** — bouquets with product photos and prices in Naira (₦18,000–₦75,000), filterable by category, for customers who already know what they want.
- **Occasion shortcuts** — quick paths for the twelve occasions the shop serves: Birthday, Thank You, Anniversary, Valentine's Day, Get Well Soon, Congratulations, New Baby, Sympathy, Wedding, Graduation, Housewarming, and Other/Just Because.

### Ordering

- **Guided order form** — customer details, delivery city (Lagos, Abuja, Port Harcourt, Ibadan, Kano), delivery area and optional landmark, occasion, bouquet choice *or* an occasion-based suggestion flow, delivery date, and an optional card message.
- **Smart date picker** — Saturday deliveries are not offered, so Saturdays are automatically disabled in the calendar.
- **Order confirmation** — validates input and shows a confirmation state (no payment processing yet).

### Chatbot

- **IBM watsonx Assistant web chat**, embedded site-wide in the bottom corner, helping customers pick bouquets and answer shop questions.
- A stable, self-hosted bot avatar served at `/florence-avatar.png`, so the chatbot's image never depends on a third-party link that could break.

## 🛠️ Built with

- **Lovable** — AI-assisted full-stack development: each feature was described in plain language, generated, reviewed, and refined through iteration.
- **React + TypeScript + Tailwind CSS** — the modern component stack, styled with a custom cream-and-deep-green "garden" design system.
- **IBM watsonx Assistant** — conversational AI for the customer-facing chatbot.
- **Git & GitHub** — version control; every change made in Lovable commits straight to this repository.

## 📱 Responsiveness & accessibility

- Fully responsive layout, including a mobile hamburger navigation.
- The navigation highlights the current page with an active-state indicator.
- Keyboard-focus outlines and screen-reader-friendly labels throughout.

## 🗺️ Pages

| Page | Purpose |
| --- | --- |
| Home | Hero banner, trust strip, occasion shortcuts, collections, testimonials |
| Flowers | Filterable bouquet catalogue with prices |
| Order | Guided order form with suggestion flow |
| Locations | Addresses and opening hours for the five shop cities |
| About / Contact | Brand story and customer contact form |

## 🚧 Known placeholders

- Customer testimonials are sample content pending real reviews.
- Bouquet photos are placeholders pending product photography.

## 📄 Project structure notes

- Bouquet data (names, descriptions, prices) lives in a single editable data file, so pricing and stock updates happen in one place.
- The order form is front-end only today; a backend with payment handling is planned.

## 🔗 Connect

- TikTok: [@uyi_biglia](https://tiktok.com/@uyi_biglia)
- X (Twitter): [@Uyi_Biglia](https://x.com/Uyi_Biglia)

---

*Florence Flowers · UO Group*
