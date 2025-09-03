import React from 'react'
import ReactDOM from 'react-dom/client'
import { I18nProvider, browser, ignorePlaceCode, useTranslation, useInlineTranslation } from '@plaidev/react-i18n'

const App = () => {
  const t = useTranslation({ en: { hello: 'Hello' }, ja: { hello: 'こんにちは' } })
  const inlineT = useInlineTranslation()
  return (
    <div>
      <div>t.hello: {t.hello}</div>
      <div>inline: {inlineT({ en: 'Hi', ja: 'やあ' })}</div>
    </div>
  )
}

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <I18nProvider fallbackLocale="en" detectors={[browser, ignorePlaceCode]}>
      <App />
    </I18nProvider>
  </React.StrictMode>
)


