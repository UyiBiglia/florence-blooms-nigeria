/**
 * Florence Flowers bouquet catalog.
 *
 * Placeholder Naira prices (₦18,000 – ₦75,000) — clearly editable once a
 * real price list exists.
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
};

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
  },
];

export function getBouquet(slug: string | undefined | null): Bouquet | undefined {
  if (!slug) return undefined;
  return BOUQUETS.find((b) => b.slug === slug);
}

/**
 * Suggest a bouquet for a customer who doesn't have anything in mind,
 * based on their occasion (primary) and delivery city (for the message).
 */
export function suggestBouquet(occasion: string): Bouquet {
  const match = BOUQUETS.find((b) => b.occasions.includes(occasion));
  return match ?? BOUQUETS[0];
}
