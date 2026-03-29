export const SITE_NAME = "ConvoMundo";

export const SITE_BASE_URL =
  process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "") ?? "https://convomundo.com";
export const FORMSPREE_FORM_ID = "maqblqao";

export const VERIFIED_LANGUAGES = ["English", "Spanish"];

export const LANGUAGE_IMAGES: Record<string, string> = {
  English:
    "https://res.cloudinary.com/damqrrryq/image/upload/v1769680640/marcin-nowak-iXqTqC-f6jI-unsplash_khs38v.jpg",
  Spanish:
    "https://res.cloudinary.com/damqrrryq/image/upload/v1769680753/jorge-fernandez-salas-ChSZETOal-I-unsplash_2_qrj8r2.jpg",
  French:
    "https://res.cloudinary.com/damqrrryq/image/upload/v1769680687/chris-karidis-nnzkZNYWHaU-unsplash_lnc5al.jpg",
  Italian:
    "https://res.cloudinary.com/damqrrryq/image/upload/v1769680720/sergey-omelchenko-_D6ttEOqGgo-unsplash_dd0p1d.jpg",
  "Chinese (Simplified)":
    "https://res.cloudinary.com/damqrrryq/image/upload/v1769879332/hanson-lu-Q36BvLGdOAg-unsplash_agbvdl.jpg",
};
