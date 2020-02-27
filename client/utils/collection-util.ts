export const find = (collection: any[], predicate: IObject): any => {
  for (let i = 0; i < collection.length; i += 1) {
    const item = collection[i];
    const keys = Object.keys(predicate);
    let found = true;
    keys.forEach((key: string) => {
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
