/**
 * Florence Flowers bouquet catalog.
 *
 * Placeholder Naira prices (₦18,000 – ₦75,000) — clearly editable once a
 * real price list exists.
 *
 * Each bouquet also carries an intended recipient ("her", "him" or
 * "anyone") so the catalog can be browsed by recipient and the suggestion
 * flow can match gifts to the person receiving them.
 */
import galleryBirthday from "@/assets/gallery-birthday.jpg";
import galleryWedding from "@/assets/gallery-wedding.jpg";
import gallerySunflowers from "@/assets/gallery-sunflowers.jpg";
import galleryRoses from "@/assets/gallery-roses.jpg";
import galleryPastels from "@/assets/gallery-pastels.jpg";
import galleryPlant from "@/assets/gallery-plant.jpg";
import bouquetSympathy from "@/assets/bouquet-sympathy.jpg";
import bouquetAnniversary from "@/assets/bouquet-anniversary.jpg";
import bouquetCongratulations from "@/assets/bouquet-congratulations.jpg";
import bouquetValentine from "@/assets/bouquet-valentine.jpg";

/** Who the bouquet is meant for, as shown in the catalog and suggestions. */
export type Recipient = "her" | "him" | "anyone";

export type Bouquet = {
  slug: string;
  name: string;
  src: string;
  alt: string;
  description: string;
  /** Placeholder starting price in Naira, e.g. "₦25,000" */
  price: string;
  /** Occasions this bouquet suits, matching the /order occasion list. */
  occasions: string[];
  /** Intended recipient: "her", "him" or "anyone". */
  forWho: Recipient;
};

export const RECIPIENTS: { value: Recipient; label: string; plural: string }[] = [
  { value: "her", label: "For her", plural: "For her" },
  { value: "him", label: "For him", plural: "For him" },
  { value: "anyone", label: "For anyone", plural: "For anyone" },
];

export const BOUQUETS: Bouquet[] = [
  {
    slug: "birthday-cheer",
    name: "Birthday Cheer",
    src: galleryBirthday,
    alt: "Bright, joyful mixed bouquet wrapped in kraft paper",
    description:
      "A bright, joyful mix of seasonal blooms in kraft wrap — made to make someone's day.",
    price: "₦25,000",
    occasions: ["Birthday", "Thank You", "Other / Just Because"],
    forWho: "anyone",
  },
  {
    slug: "bridal-white",
    name: "Bridal White",
    src: galleryWedding,
    alt: "Elegant white rose and peony wedding bouquet",
    description:
      "Elegant white roses and peonies, tied for the big day. Also beautiful for engagements.",
    price: "₦75,000",
    occasions: ["Wedding", "Anniversary"],
    forWho: "her",
  },
  {
    slug: "sunflower-smile",
    name: "Sunflower Smile",
    src: gallerySunflowers,
    alt: "Cheerful sunflowers and yellow daisies in a glass jar",
    description:
      "Cheerful sunflowers and yellow daisies to lift anyone's spirits.",
    price: "₦18,000",
    occasions: ["Get Well Soon", "Graduation", "Congratulations", "Birthday"],
    forWho: "him",
  },
  {
    slug: "classic-red-roses",
    name: "Classic Red Roses",
    src: galleryRoses,
    alt: "Classic bouquet of deep red roses",
    description:
      "A classic bouquet of deep red roses. The timeless way to say I love you.",
    price: "₦35,000",
    occasions: ["Anniversary", "Valentine's Day"],
    forWho: "her",
  },
  {
    slug: "pastel-basket",
    name: "Pastel Basket",
    src: galleryPastels,
    alt: "Soft pastel basket of pink and blue roses with baby's breath",
    description:
      "Soft pastel pinks and blues with baby's breath, arranged in a keepsake basket.",
    price: "₦28,000",
    occasions: ["New Baby", "Thank You", "Birthday"],
    forWho: "her",
  },
  {
    slug: "green-blooming",
    name: "Green & Blooming",
    src: galleryPlant,
    alt: "Welcoming potted plant beside a fresh mixed bouquet",
    description:
      "A welcoming potted plant paired with fresh mixed blooms — a gift that lasts.",
    price: "₦22,000",
    occasions: ["Housewarming", "Get Well Soon", "Other / Just Because"],
    forWho: "him",
  },
  {
    slug: "pure-serenity",
    name: "Pure Serenity",
    src: bouquetSympathy,
    alt: "Peaceful white lilies and chrysanthemums with baby's breath in cream wrap",
    description:
      "Peaceful white lilies and chrysanthemums with baby's breath — a calm, gentle tribute.",
    price: "₦40,000",
    occasions: ["Sympathy"],
    forWho: "anyone",
  },
  {
    slug: "anniversary-blush",
    name: "Anniversary Blush",
    src: bouquetAnniversary,
    alt: "Romantic blush pink roses and white lilies with eucalyptus in pink wrap",
    description:
      "Blush pink roses and white lilies with soft eucalyptus — romantic and elegant.",
    price: "₦55,000",
    occasions: ["Anniversary", "Valentine's Day", "Wedding"],
    forWho: "her",
  },
  {
    slug: "joyful-gerbera",
    name: "Joyful Gerbera",
    src: bouquetCongratulations,
    alt: "Bold orange, pink and yellow gerbera daisies and lilies in bright wrap",
    description:
      "Bold gerbera daisies and sunny lilies in vivid colours — pure celebration.",
    price: "₦30,000",
    occasions: ["Congratulations", "Graduation", "Birthday"],
    forWho: "him",
  },
  {
    slug: "tulip-romance",
    name: "Tulip Romance",
    src: bouquetValentine,
    alt: "Red and pink tulips with baby's breath wrapped in soft pink paper",
    description:
      "Red and pink tulips with baby's breath — a fresh take on romance.",
    price: "₦45,000",
    occasions: ["Valentine's Day", "Anniversary", "Other / Just Because"],
    forWho: "her",
  },
];

export function getBouquet(slug: string | undefined | null): Bouquet | undefined {
  if (!slug) return undefined;
  return BOUQUETS.find((b) => b.slug === slug);
}

export function isRecipient(value: string | undefined | null): value is Recipient {
  return value === "her" || value === "him" || value === "anyone";
}

/**
 * Suggest a bouquet for a customer who doesn't have anything in mind,
 * based on the occasion, the delivery city (for the message), and who the
 * gift is for.
 *
 * Preference order: an occasion match for the recipient, then an occasion
 * match for anyone, then any occasion match, then any bouquet for the
 * recipient, then any bouquet for anyone.
 */
export function suggestBouquet(occasion: string, recipient: Recipient = "anyone"): Bouquet {
  const occasionMatches = BOUQUETS.filter((b) => b.occasions.includes(occasion));
  const byOccasion =
    occasionMatches.find((b) => b.forWho === recipient) ??
    occasionMatches.find((b) => b.forWho === "anyone") ??
    occasionMatches[0];
  if (byOccasion) return byOccasion;
  return (
    BOUQUETS.find((b) => b.forWho === recipient) ??
    BOUQUETS.find((b) => b.forWho === "anyone") ??
    (BOUQUETS[0] as Bouquet)
  );
}
