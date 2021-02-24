/* eslint-disable no-console */

import { promisify } from 'util';
import { exists, promises as fs } from 'fs';
import { LOCALES, LocaleType } from 'config';

const { readFile, writeFile } = fs;

type Translation = Record<string, string>;

const getLocaleJsonPath = (locale: LocaleType | 'temp') => `src/locales/${locale}.json`;

const readLocaleJSON = async (locale: LocaleType | 'temp'): Promise<Translation> => {
  try {
    const dataBuffer = await readFile(getLocaleJsonPath(locale));

    return JSON.parse(dataBuffer.toString());
  } catch (e) {
    throw new Error(`Error in reading ${locale} JSON`);
  }
};

const writeLocaleJSON = async (locale: LocaleType, translations: Translation): Promise<void> => {
  try {
    await writeFile(getLocaleJsonPath(locale), JSON.stringify(translations, null, 2));
  } catch ({ message }) {
    throw new Error(`Error in writing ${locale} JSON`);
  }
};

const localeJsonExists = async (locale: LocaleType): Promise<boolean> => {
  try {
    return await promisify(exists)(getLocaleJsonPath(locale));
  } catch (e) {
    return false;
  }
};

const arrayToJsonReducer = (
  array: string[],
  current: Translation,
  initialValue = {},
) => array.reduce((
  accumulator: Translation,
  currentValue,
) => {
  accumulator[currentValue] = current[currentValue];

  return accumulator;
}, initialValue);

const generateLocaleJSON = async (
  locale: LocaleType,
  tempJSON: Translation,
  deletedKeys: string[],
  updatedKeys: string[],
) => {
  try {
    // read the locale JSON
    let localeJSON = await readLocaleJSON(locale);

    // removed deleted translations from locale JSON
    if (deletedKeys.length) {
      deletedKeys.forEach((key) => delete localeJSON[key]);
    }

    // if new translations are present in en JSON, add them to existing locale JSON
    if (updatedKeys.length) {
      // add updated translations to existing locale JSON
      const updatedLocaleJSON = arrayToJsonReducer(updatedKeys, tempJSON, localeJSON);

      // sort the locale JSON
      const sortedKeys = Object.keys(updatedLocaleJSON).sort();
      localeJSON = arrayToJsonReducer(sortedKeys, updatedLocaleJSON);
    }

    // write the locale JSON
    await writeLocaleJSON(locale, localeJSON);
  } catch (e) {
    throw new Error(`Error in generating ${locale} JSON`);
  }
};

const generateLocales = async () => {
  try {
    // read temp JSON extracted by format js cli
    const tempJSON = await readLocaleJSON('temp');

    // check if en JSON exists
    const [en] = LOCALES;
    const enJsonExists = await localeJsonExists(en);

    if (!enJsonExists) {
      // if en JSON doesn't exist, assume none of the other locale
      // JSON exist as well and write them with temp JSON translations
      console.log('Writing all locale JSON');
      await Promise.all(LOCALES.map((locale) => writeLocaleJSON(locale, tempJSON)));
      console.log('All locale JSON written successfully');
    } else {
      console.log('Checking updated or deleted translations');

      // as locale en JSON exists, read it
      const enJson = await readLocaleJSON(en);

      // get the keys of both en and temp JSON
      const enKeys = Object.keys(enJson);
      const tempKeys = Object.keys(tempJSON);

      // check the diff of en and temp JSON for deleted and updated translations
      const deletedKeys = enKeys.filter((key) => !tempKeys.includes(key));
      const updatedKeys = tempKeys.filter((key) => tempJSON[key] !== enJson[key]);

      // write locale JSON if either some translations have been deleted or updated
      if (deletedKeys.length || updatedKeys.length) {
        console.log('Updated or deleted translations found');
        console.log('Writing all locale JSON');

        await Promise.all(LOCALES.map((locale) => generateLocaleJSON(
          locale,
          tempJSON,
          deletedKeys,
          updatedKeys,
        )));

        console.log('All locale JSON written successfully');
      } else {
        console.log('Translations upto date');
      }
    }
  } catch ({ message }) {
    console.error(message);
  }
};

generateLocales();
