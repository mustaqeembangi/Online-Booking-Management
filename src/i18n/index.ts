// The site is in English (no prefix: /, /tours) and Arabic (/ar, /ar/tours).
export type Lang = "en" | "ar";
export const LANGS: Lang[] = ["en", "ar"];

export const dir = (lang: Lang) => (lang === "ar" ? "rtl" : "ltr");

// Internal link for a language: lp("ar", "/tours?category=x") -> "/ar/tours?category=x".
export function lp(lang: Lang, path: string) {
  if (lang === "en") return path;
  return path === "/" ? "/ar" : `/ar${path}`;
}

// Numbers stay in Western digits in both languages (what the UAE uses on signs and prices).
export const numberLocale = (lang: Lang) => (lang === "ar" ? "ar-AE-u-nu-latn" : "en-US");
export const num = (lang: Lang, n: number) => n.toLocaleString(numberLocale(lang));

export { UI, type UIStrings } from "./ui";
