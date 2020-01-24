export interface Style {
  [propName: string]: string;
}

export interface ClassNamePredicate {
  [className: string]: boolean;
}

export interface Offset {
  x?: number;
  y?: number;
}

export interface HTMLRect {
  top?: number | string;
  right?: number | string;
  bottom?: number | string;
  left?: number | string;
  width?: number | string;
  height?: number | string;
}
