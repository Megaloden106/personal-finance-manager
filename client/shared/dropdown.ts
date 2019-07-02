interface Style {
  [propName: string]: string;
}

export interface Item {
  text: string;
  value: string;
  style?: Style;
}

export interface ItemSelection {
  data?: string;
  time?: string;
}
