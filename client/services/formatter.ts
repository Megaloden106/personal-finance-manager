export const convertToMoney = (num: number): string => {
  if (num === 0) {
    return '$0.00';
  }
  const money = num.toFixed(2);
  let comma = money.length % 3 || 3;
  let result = '$';
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
