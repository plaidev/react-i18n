import type { Locale } from "./locales";

export type Detector = (previouslyDetectedLocale: Locale) => Locale;
export const browser: Detector = (locale: Locale): Locale => {
  if (typeof window === 'undefined' || typeof window.navigator === 'undefined') {
    return locale;
  }
  const nav = window.navigator as Navigator | undefined;
  const lang = (nav?.languages && nav.languages[0]) || nav?.language;
  if (!lang) return locale;
  return lang as Locale;
};

export const ignorePlaceCode: Detector = (locale: Locale): Locale => {
  return locale.substring(0, 2) as Locale;
};

/**
 * for detecting the specific locale
 */
export const forcedLocale = (locale: Locale): Detector => {
  return (_: Locale): Locale => {
    return locale;
  };
};

export const cookie = (cookieKey: string): Detector => {
  return (locale: Locale) => {
    if (typeof document === 'undefined') {
      return locale;
    }
    const cookieValue = document.cookie
      .split("; ")
      .find((row) => row.startsWith(cookieKey + "="))
      ?.split("=")[1];
    if (!cookieValue) return locale;
    return cookieValue as Locale;
  };
};
