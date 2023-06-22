import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import resources from './locales';

const initI18n = async () => {
  await i18n
    .use(initReactI18next)
    .init({
      lng: 'ru',
      debug: false,
      resources,
    });
};

export default initI18n;
