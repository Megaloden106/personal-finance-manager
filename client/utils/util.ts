import { PortalRect } from '@/components/Portal/models/Portal';

export const convertToMoney = (num: number): string => {
  if (num === 0) {
    return '$0.00';
  }
  const money = Math.abs(num).toFixed(2);
  let result = num >= 0 ? '$' : '-$';
  for (let i = 0; i < money.length; i += 1) {
    if ((money.length - i) % 3 === 0 && money[i] !== '.') {
      result += ',';
    }
    result += money[i];
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

export const convertToStyle = (rect: PortalRect): string => {
  let htmlStyle = 'position: absolute; ';
  Object.keys(rect).forEach((key: string) => {
    htmlStyle += `${key}: ${rect[key]}px; `;
  });

  return htmlStyle;
};
