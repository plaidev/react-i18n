import type { Locale } from "./locales";

export type Detector = (locale?: Locale) => Locale | undefined;
export const browser: Detector = (_?: Locale): Locale | undefined => {
  const navigator = window.navigator;
  const lang =
    (navigator.languages && navigator.languages[0]) || navigator.language;
  if (!lang) return undefined;
  return lang as Locale;
};

export const ignorePlaceCode: Detector = (
  locale?: Locale
): Locale | undefined => {
  if (!locale) return undefined;
  return locale.substring(0, 2) as Locale;
};

/**
 * for detecting the specific locale
 */
export const forcedLocale = (locale: Locale): Detector => {
  return (_?: Locale): Locale | undefined => {
    return locale;
  };
};

export const cookie = (cookieKey: string): Detector => {
  return (_?: Locale) => {
    const cookieValue = document.cookie
      .split("; ")
      .find((row) => row.startsWith(cookieKey + "="))
      ?.split("=")[1];
    if (!cookieValue) return undefined;
    return cookieValue as Locale;
  };
};
