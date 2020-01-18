declare module '*.scss' {
  const content: {
    [className: string]: string;
  };
  export default content;
}

interface Window {
  __REDUX_DEVTOOLS_EXTENSION__?: Function;
}

type DeepReadonly<T> =
  T extends (infer R)[] ? DeepReadonlyArray<R> :
    T extends Function ? T :
      T extends object ? DeepReadonlyObject<T> :
        T;

interface DeepReadonlyArray<T> extends ReadonlyArray<DeepReadonly<T>> {}

type DeepReadonlyObject<T> = {
  readonly [P in keyof T]: DeepReadonly<T[P]>;
};

interface Route {
  name: string;
  endpoint: string;
  level: number;
  className?: string;
}

interface IObject {
  [key: string]: any;
}

interface ClassNamePredicate {
  [className: string]: boolean;
}

interface HTMLRect {
  top?: number | string;
  right?: number | string;
  bottom?: number | string;
  left?: number | string;
  width?: number | string;
  height?: number | string;
}
