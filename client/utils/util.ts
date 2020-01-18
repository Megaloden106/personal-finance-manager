export const convertToMoney = (num: number): string => {
  if (num === 0) {
    return '$0.00';
  }
  const money = Math.abs(num).toFixed(2);
  let result = num >= 0 ? '$' : '-$';
  result += money[0];
  for (let i = 1; i < money.length; i += 1) {
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
