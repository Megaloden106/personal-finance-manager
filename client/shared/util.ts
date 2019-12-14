export const convertToMoney = (num: number): string => {
  if (num === 0) {
    return '$0.00';
  }
  const money = Math.abs(num).toFixed(2);
  let comma = money.length % 3 || 3;
  let result = num >= 0 ? '$' : '-$';
  for (let i = 0; i < money.length; i += 1) {
    if (comma === 0 && money[i] !== '.') {
      result += ',';
      comma += 3;
    }
    result += money[i];
    comma -= 1;
  }
  return result;
};

export const convertToPercent = (num: number): string => {
  if (num > 0) {
    return `+${num.toFixed(2)}%`;
  }
  if (num < 0) {
    return `-${(-1 * num).toFixed(2)}%`;
  }
  return '0.00%';
};

export const convertToCamelCase = (str: string): string => str[0].toLowerCase()
  + str.slice(1).replace(/ [A-Za-z]/g, chars => chars[1].toUpperCase());

export const indentyCallback = (_i: number): number => _i;
