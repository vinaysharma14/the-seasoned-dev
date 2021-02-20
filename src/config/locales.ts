const LOCALES = ['en', 'fr', 'de', 'nl', 'da'] as const;

export type LocaleType = typeof LOCALES[number];

export { LOCALES };
