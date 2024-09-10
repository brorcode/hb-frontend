export const toCurrency = (n: number, currency = 'RUB', locale = 'ru-RU') => {
  return new Intl.NumberFormat(locale, { style: 'currency', currency: currency }).format(n);
};
