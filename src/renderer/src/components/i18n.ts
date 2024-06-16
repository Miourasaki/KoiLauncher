import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'
import { resources } from '../assets/locales/resources'

let localStorageLanguage = localStorage.getItem('launcher.option.language')
if (localStorageLanguage == null) localStorageLanguage = navigator.language

i18n
  // 将 i18n 实例传递给 react-i18next
  .use(initReactI18next)
  // 初始化 i18next
  // 所有配置选项: https://www.i18next.com/overview/configuration-options
  .init({
    resources,
    fallbackLng: 'en',
    lng: localStorageLanguage,
    // lng: 'en',
    debug: false,
    interpolation: {
      escapeValue: false // not needed for react as it escapes by default
    }
  })
  .then(() => {})

export default i18n
