import en from 'react-intl/locale-data/en';
import es from 'react-intl/locale-data/es';
import { addLocaleData } from 'react-intl';
import enData from './en-EN';
import esData from './es-ES';

const langs = {
  en: enData,
  es: esData,
};

addLocaleData([...en, ...es]);
const language =
  (navigator.languages && navigator.languages[0]) || navigator.language || navigator.userLanguage;
const languageWithoutRegionCode = language.toLowerCase().split(/[_-]+/)[0];
const messages = langs[languageWithoutRegionCode] || langs[language] || langs.en;

export { language, messages };
