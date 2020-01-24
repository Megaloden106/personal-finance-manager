import { ClassNamePredicate } from '@/models/style';

export const getClassName = (predicate: ClassNamePredicate): string => {
  const classNames: string[] = [];

  Object.keys(predicate).forEach((k: string) => {
    if (predicate[k]) {
      classNames.push(k);
    }
  });

  return classNames.join(' ');
};
