import type { Locale } from './locales';
import type { Detector } from './detectors';
import { ReactNode, createContext, useState, useMemo, useContext } from 'react';

type State = {
  locale: Locale;
  fallbackLocale: Locale;
}
type Api = {
  setLocale: (locale: Locale | ((locale: Locale) => Locale)) => void;
  setFallbackLocale: (locale: Locale | ((locale: Locale) => Locale)) => void;
}
type Context = [State, Api];
const context = createContext<Context>([{
  locale: 'en',
  fallbackLocale: 'en',
}, {
  setLocale: () => {},
  setFallbackLocale: () => {},
}]);

export type I18ProviderProps = {
  fallbackLocale: Locale;
  detectors?: Detector[];
  children?: ReactNode;
}
export const I18nProvider = ({ detectors, fallbackLocale, children }: I18ProviderProps) => {
  const [state, setState] = useState<State>(() => {
    let locale = fallbackLocale;
    detectors?.some((detector) => {
      locale = detector(locale);
      return locale;
    });
    return {
      locale,
      fallbackLocale,
    };
  });
  const api = useMemo<Api>(() => {
    return {
      setLocale: (locale) => {
        if (locale instanceof Function) {
          setState((state) => ({
            ...state,
            locale: locale(state.locale),
          }));
        } else {
          setState((state) => ({
            ...state,
            locale,
          }));
        }
      },
      setFallbackLocale: (locale) => {
        if (locale instanceof Function) {
          setState((state) => ({
            ...state,
            fallbackLocale: locale(state.fallbackLocale),
          }));
        } else {
          setState((state) => ({
            ...state,
            fallbackLocale: locale,
          }));
        }
      }
    }
  }, [setState]);
  const value = useMemo<Context>(() => {
    return [state, api];
  }, [state, api])

  return <context.Provider
    value={value}
  >
    {children}
  </context.Provider>
}

export const useLocaleSetting = (): State => {
  const [state] = useContext(context);
  return state;
}

export const useSetLocaleSetting = (): Api => {
  const [, api] = useContext(context);
  return api;
}
