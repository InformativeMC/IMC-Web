import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'
import zhTranslation from './i18n-zh.json'
import enTranslation from './i18n-en.json'

const resources = {
    en: enTranslation,
    zh: zhTranslation
}

i18n
    .use(initReactI18next) // passes i18n down to react-i18next
    .init({
        resources,
        lng: 'zh',
        interpolation: {
            escapeValue: false // react already safes from xss
        }
    })

export default i18n