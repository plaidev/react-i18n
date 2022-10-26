import { useCallback } from "react";
import { useLocaleSettingValue } from "./provider";
import { Currency } from "./locales";

/**
 * @example
 * const currency = useCurrency();
 * currency(100, 'USD') // $100
 *
 * @reference
 * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/NumberFormat
 */
export const useCurrencyFormat = () => {
  const setting = useLocaleSettingValue();
  return useCallback(
    (value: number | bigint, currency: Currency) => {
      const formatter = new Intl.NumberFormat(setting.locale, {
        style: "currency",
        currency,
      });
      return formatter.format(value);
    },
    [setting]
  );
};

/**
 * @reference
 * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/NumberFormat
 */
export const useNumberFormat = () => {
  const setting = useLocaleSettingValue();
  return useCallback(
    (value: number, option?: Intl.NumberFormatOptions) => {
      const formatter = new Intl.NumberFormat("en-US", option);
      return formatter.format(value);
    },
    [setting]
  );
};

/**
 * @reference https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/DateTimeFormat
 */
export const useDateTimeFormat = () => {
  const setting = useLocaleSettingValue();
  return useCallback(
    (data: number | Date | undefined, options?: Intl.DateTimeFormatOptions) => {
      const formatter = new Intl.DateTimeFormat(setting.locale, options);
      return formatter.format(data);
    },
    [setting]
  );
};

/**
 * @reference https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/RelativeTimeFormat
 */
export const useRelativeTimeFormat = () => {
  const setting = useLocaleSettingValue();
  return useCallback(
    (
      value: number,
      unit: Intl.RelativeTimeFormatUnit,
      options?: Intl.RelativeTimeFormatOptions
    ) => {
      const formatter = new Intl.RelativeTimeFormat(setting.locale, options);
      return formatter.format(value, unit);
    },
    [setting]
  );
};

/**
 * @reference https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/ListFormat
 */
export const useListFormat = () => {
  const setting = useLocaleSettingValue();
  return useCallback(
    (list: string[], options?: Intl.ListFormatOptions) => {
      const formatter = new Intl.ListFormat(setting.locale, options);
      return formatter.format(list);
    },
    [setting]
  );
};

/**
 * @reference https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/PluralRules
 */
export const usePluralRules = () => {
  const setting = useLocaleSettingValue();
  return useCallback(
    (value: number, options?: Intl.PluralRulesOptions) => {
      const formatter = new Intl.PluralRules(setting.locale, options);
      return formatter.select(value);
    },
    [setting]
  );
};
