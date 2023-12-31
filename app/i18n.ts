// i18n.ts
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

import translationsEn from '../app/translations.json';
import translationsRu from '../app/translations.ru.json';

const resources = {
  en: {
    translation: translationsEn,
  },
  ru: {
    translation: translationsRu,
  },
};

i18n.use(initReactI18next).init({
  resources,
  lng: 'en',
  fallbackLng: 'en',
  interpolation: {
    escapeValue: false,
  },
});

export default i18n;
