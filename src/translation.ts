import { useMemo, useRef } from "react";
import type { Locale } from "./locales";
import { useLocaleSetting } from "./provider";

const VITE_PLUGIN_REACT_PREAMBLE_INSTALLED = (window as any).__vite_plugin_react_preamble_installed__ as boolean | undefined;
if (VITE_PLUGIN_REACT_PREAMBLE_INSTALLED) {
  console.warn("@plaidev/react-i18n: @vitejs/plugin-react is detected, so useTranslation won't cache the resources. However, it will be cached on production build.");
}

export const useTranslation = <Resource, Locales extends Locale>(resources: {
  [key in Locales]: Resource;
}): Resource => {
  const ref = useRef<typeof resources>(resources);
  const setting = useLocaleSetting();

  /**
   * VITE_PLUGIN_REACT_PREAMBLE_INSTALLED is always the same in the context, so we can use if-condition.
   */
  const dependencies: any[] = [setting, ref];
  if (VITE_PLUGIN_REACT_PREAMBLE_INSTALLED) {
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
