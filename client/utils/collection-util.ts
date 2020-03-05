
// typescript non-issue. Parens are added already, but Generic type causing confusion
// eslint-disable-next-line arrow-parens
export const find = <T>(collection: T[], predicate: Partial<T>): T => {
  for (let i = 0; i < collection.length; i += 1) {
    const item = collection[i];
    const keys = Object.keys(predicate) as (keyof T)[];
    let found = true;
    keys.forEach((key: keyof T) => {
      if (item[key] !== predicate[key]) {
        found = false;
      }
    });

    if (found) {
      return item;
    }
  }

  return null;
};

export function get<T, K extends keyof T>(collection: T, predicate: K): T[K] {
  return collection[predicate];
}

export function set<T, K extends keyof T>(collection: T, predicate: K, value: any): void {
  const object = collection;
  object[predicate] = value;
}
