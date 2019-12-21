export const find = (collection: any[], predicate: IObject): any | null => {
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

export const get = (collection: IObject, predicate: string | string[]): any | null => {
  if (typeof predicate === 'string') {
    return collection[predicate] || null;
  }
  let result = collection;
  predicate.forEach((key) => {
    if (result) {
      result = result[key] || null;
    }
  });

  return result;
};
