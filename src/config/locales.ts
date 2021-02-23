const LOCALES = ['en', 'fr'] as const;

export type LocaleType = typeof LOCALES[number];

export { LOCALES };
