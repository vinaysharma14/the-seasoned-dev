/* eslint-disable no-console */

import { promisify } from 'util';
import { exists, promises as fs } from 'fs';
import { LOCALES, LocaleType } from 'config';

const { readFile, writeFile } = fs;
const [en, ...restLocales] = LOCALES;

type Translation = Record<string, string>;

const getLocaleJsonPath = (locale: LocaleType) => `src/locales/${locale}.json`;

const readLocaleJSON = async (locale: LocaleType): Promise<Translation> => {
  try {
    console.log(`Reading ${locale} JSON\n`);
    const dataBuffer = await readFile(getLocaleJsonPath(locale));

    return JSON.parse(dataBuffer.toString());
  } catch (e) {
    throw new Error(`Error in reading ${locale} JSON`);
  }
};

const writeLocaleJSON = async (locale: LocaleType, translations: Translation): Promise<void> => {
  try {
    console.log(`Writing ${locale} JSON\n`);
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
  index: number,
  enJSON: Translation,
  existStatus: boolean,
) => {
  const locale = restLocales[index];

  try {
    // if locale JSON doesn't exist, write it with entire en JSON
    if (!existStatus) {
      console.log(`${locale} JSON doesn't exist`);
      await writeLocaleJSON(locale, enJSON);
    } else {
      console.log(`Checking ${locale} JSON for new translation`);

      // as locale JSON exists, read it
      let localeJSON = await readLocaleJSON(locale);

      const enKeys = Object.keys(enJSON);
      const localeKeys = Object.keys(localeJSON);

      // check the diff of locale JSON and en JSON for new and deleted translations
      const newTranslations = enKeys.filter((key) => enJSON[key] !== localeJSON[key]);
      const deletedTranslations = localeKeys.filter((key) => !enKeys.includes(key));

      if (newTranslations.length || deletedTranslations.length) {
        // removed deleted translations from locale JSON
        if (deletedTranslations.length) {
          deletedTranslations.forEach((key) => delete localeJSON[key]);
        }

        // if new translations are present in en JSON, add them to existing locale JSON
        if (newTranslations.length) {
        // add updated translations to existing locale JSON
          const updatedLocaleJSON = arrayToJsonReducer(newTranslations, enJSON, localeJSON);

          // sort the locale JSON
          const sortedJsonKeys = Object.keys(updatedLocaleJSON).sort();
          localeJSON = arrayToJsonReducer(sortedJsonKeys, updatedLocaleJSON);
        }

        // write the locale JSON
        await writeLocaleJSON(locale, localeJSON);
      } else {
        console.log(`${locale} JSON upto date!`);
      }
    }
  } catch (e) {
    throw new Error(`Error in generating ${locale} JSON`);
  }
};

const init = async () => {
  try {
    // read en JSON extracted by format js cli
    const enJSON = await readLocaleJSON(en);

    // check what all locale JSON exist
    const existStatus = await Promise.all(restLocales.map((locale) => localeJsonExists(locale)));

    // generate locale JSON based on if they exist or not
    await Promise.all(existStatus.map((exist, index) => generateLocaleJSON(index, enJSON, exist)));
  } catch ({ message }) {
    console.error(message);
  }
};

init();
