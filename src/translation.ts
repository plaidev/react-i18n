import { useMemo, useRef } from "react";
import type { Locale } from "./locales";
import { useLocaleSettingValue } from "./provider";

const VITE_PLUGIN_REACT_PREAMBLE_INSTALLED = (window as any)
  .__vite_plugin_react_preamble_installed__ as boolean | undefined;
if (VITE_PLUGIN_REACT_PREAMBLE_INSTALLED) {
  console.warn(
    "@plaidev/react-i18n: @vitejs/plugin-react is detected, so useTranslation won't cache the resources. However, it will be cached on production build."
  );
}

/**
 * @example
 * const translated = useTranslation({
 *   en: {
 *     hello: "Hello",
 *   },
 *   ja: {
 *    hello: "こんにちは",
 *   },
 * });
 * translated.hello; // "Hello" or "こんにちは"
 */
export const useTranslation = <Resource, Locales extends Locale>(resources: {
  [key in Locales]: Resource;
}): Resource => {
  const ref = useRef<typeof resources>(resources);
  const setting = useLocaleSettingValue();

  /**
   * VITE_PLUGIN_REACT_PREAMBLE_INSTALLED is always the same in the context, so we can use if-condition.
   */
  const dependencies: any[] = [setting, ref];
  if (VITE_PLUGIN_REACT_PREAMBLE_INSTALLED) {
    ref.current = resources;
    dependencies.push(resources);
  }
  return useMemo(() => {
    const resources = ref.current;
    const resource =
      (resources as any)[setting.locale] ||
      (resources as any)[setting.fallbackLocale];
    if (!resource) {
      throw new Error(
        `No resource for locale ${setting.locale} or ${setting.fallbackLocale}`
      );
    }
    return resource;
  }, dependencies);
};

/**
 * @example
 * const translate = useInlineTranslation();
 * translate({ en: 'Hello', ja: 'こんにちは' }); // "Hello" or "こんにちは"
 */
export const useInlineTranslation = () => {
  const setting = useLocaleSettingValue();
  return useMemo(() => {
    return <Resource, Locales extends Locale>(resources: { [key in Locales]: Resource }): Resource => {
      const resource =
      (resources as any)[setting.locale] ||
      (resources as any)[setting.fallbackLocale];
      if (!resource) {
        throw new Error(
          `No resource for locale ${setting.locale} or ${setting.fallbackLocale}`
        );
      }
      return resource;
    }
  }, [setting]);
}
