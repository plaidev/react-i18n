import type { Locale } from "./locales";

export type Detector = (locale: Locale) => Locale;
export const browser: Detector = (locale: Locale): Locale => {
  const navigator = window.navigator;
  const lang =
    (navigator.languages && navigator.languages[0]) || navigator.language;
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
  return (_: Locale) => {
    return locale;
  };
};

export const cookie = (cookieKey: string): Detector => {
  return (locale: Locale) => {
    const cookieValue = document.cookie
      .split("; ")
      .find((row) => row.startsWith(cookieKey + "="))
      ?.split("=")[1];
    if (!cookieValue) return locale;
    return cookieValue as Locale;
  };
};
