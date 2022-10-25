# react-i18n

The most simplest internationalization library for react.

## Getting started

@plaidev/react-i18n can be installed using npm or yarn:

```
# npm
npm install -S @plaidev/react-i18n

# yarn
yarn add @plaidev/react-i18n
```

### Example

Firstly, react-i18n can be used to declare `I18nProvider` at the root of your react app.

```tsx
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { App } from './App';
import { I18nProvider, browser, ignorePlaceCode } from '@plaidev/react-i18n';

const main = () => {
  const container = document.getElementById('root');
  const root = createRoot(container!);
  root.render(
    <StrictMode>
      <I18nProvider
        fallbackLocale="en"
        detectors={[browser, ignorePlaceCode]}
      >
        <App />
      </I18nProvider>
    </StrictMode>
  );
}

main();

```

Then, you can use resource of a locale by using `useTranslation`.

```tsx
import { useTranslation } from '@plaidev/react-i18n';

export const App = () => {
  const t = useTranslation({
    pt: {
      message: 'bom dia!',
    },
    en: {
      message: 'hello!',
    },
  });
  return <div>
    {t.message}
  </div>
}

```

## Translations

### Basic

```tsx
import { useTranslation } from '@plaidev/react-i18n';

export const Hello = () => {
  const translated = useTranslation({
    ja: {
      hello: 'こんにちは',
      world: '世界',
    },
    en: {
      hello: 'hello',
      world: 'world,
    }
  });
  return <div>
    {translated.hello} {translated.world}
  </div>
}
```

### Interpolation

```tsx
import { useTranslation } from '@plaidev/react-i18n';

const Hello = () => {
  const { message } = useTranslation({
    ja: {
      message({ name }: { name: string }) {
        return `こんにちは、${name}！`
      }
    },
    en: {
      message({ name }: { name: string }) {
        return `Hello, ${name}!`
      }
    }
  });

  return <div>{message({ name: 'John' })}</div>
}
```


### Singluar / Plurals

```tsx
import { useTranslation } from '@plaidev/react-i18n';

const Hello = () => {
  const t = useTranslation({
    en: ({ count }: { count: number }) => {
      switch (true) {
        case (x === 0):
          return 'zero'
        case (x === 1):
          return 'one'
        case (x <= 10):
          return "few"
        default:
          return "many"
      }
    }
  })
  return <div>
    {t(5)}
  </div>
}
```

### Formatting

@plaidev/react-i18n supports formatter hooks that wrap [Intl](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl).

```ts
import {
  useCurrencyFormat,
  useNumberFormat,
  useDateTimeFormat,
  useRelativeTimeFormat,
  useListFormat,
  usePluralRules,
  useTranslation,
} from '@plaidev/react-i18n';

const Hello = () => {
  const currency = useCurrencyFormat();
  const howMuchMessage = useTranslation({
    en: (howMuch: number) => {
      return `This is ${currency(howMuch, 'USD')}`;
    }
  });
  return <div>
    {howMuchMessage(100)}
  </div>
}
```

## Detectors

### Cookie Detector

`cookie` detector detects locale from document.cookie

```tsx
import {
  I18nProvider,
  cookie,
} from '@plaidev/react-i18n';

<I18nProvider
  fallbackLocale="en"
  detectors={[cookie]}
>
  <App />
</I18nProvider>
```

### Browser Detector

`browser` detector detects locale from `window.navigator`.

```tsx
import {
  I18nProvider,
  browser,
} from '@plaidev/react-i18n';

<I18nProvider
  fallbackLocale="en"
  detectors={[browser]}
>
  <App />
</I18nProvider>
```

### Ignore Place Code

`ignorePlaceCode` ignores a place code from a detected locale.

e.g) ja-JP -> ja

```tsx
import {
  I18nProvider,
  browser,
  ignorePlaceCode,
} from '@plaidev/react-i18n';

<I18nProvider
  fallbackLocale="en"
  detectors={[browser, ignorePlaceCode]}
>
  <App />
</I18nProvider>
```

### Force to select a specific locale

`forcedLocale` detect a specific locale that specified by an argument.

```tsx
import {
  I18nProvider,
  forcedLocale,
} from '@plaidev/react-i18n';

<I18nProvider
  fallbackLocale="en"
  detectors={[forcedLocale('ja')]}
>
  <App />
</I18nProvider>
```
