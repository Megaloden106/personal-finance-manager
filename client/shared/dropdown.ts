interface Style {
  [propName: string]: string;
}

export interface Menu {
  text: string;
  value: string;
  style?: Style;
}

export interface Selected {
  data: string;
  time: string;
}
