import { useMemo } from 'react';
import type { Locale } from './locales';
import { useLocaleSetting } from './provider';

export const useTranslation = <Resource, Locales extends Locale>(resources: {
  [key in Locales]: Resource;
}): Resource => {
  const setting = useLocaleSetting();
  return useMemo(() => {
    const resource = (resources as any)[setting.locale] || (resources as any)[setting.fallbackLocale];
    if (!resource) {
      throw new Error(`No resource for locale ${setting.locale} or ${setting.fallbackLocale}`);
    }
    return resource;
  }, [resources, setting]);
}
