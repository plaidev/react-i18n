import { useEffect, useMemo, useRef, useState } from "react";
import type { Locale } from "./locales";
import { useLocaleSetting } from "./provider";

const VITE_PLUGIN_REACT_PREAMBLE_INSTALLED = (window as any).__vite_plugin_react_preamble_installed__ as boolean | undefined;
export const useTranslation = <Resource, Locales extends Locale>(resources: {
  [key in Locales]: Resource;
}): Resource => {
  const [resourcesRef, setResources]= useState<typeof resources>(resources);
  const setting = useLocaleSetting();

  /**
   * VITE_PLUGIN_REACT_PREAMBLE_INSTALLED is always the same in the context, so we can use useEffect in a if condition.
   */
  if (VITE_PLUGIN_REACT_PREAMBLE_INSTALLED) {
    console.warn("@plaidev/react-i18n: vite react plugin is detected, so useTranslation won't cache the resources. However, it will be cached on production build.");
    useEffect(() => {
      setResources(resources);
    }, [resources]);
  }

  return useMemo(() => {
    const resources = resourcesRef;
    const resource =
      (resources as any)[setting.locale] ||
      (resources as any)[setting.fallbackLocale];
    if (!resource) {
      throw new Error(
        `No resource for locale ${setting.locale} or ${setting.fallbackLocale}`
      );
    }
    return resource;
  }, [setting, resourcesRef]);
};
