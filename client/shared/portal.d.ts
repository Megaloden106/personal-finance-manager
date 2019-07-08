interface PortalRect {
  top?: number | string;
  right?: number | string;
  bottom?: number | string;
  left?: number | string;
  width?: number | string;
  height?: number | string;
  [key: string]: number | string | undefined;
}

interface Style {
  [propName: string]: string;
}

interface Item {
  text: string;
  value: string;
  style?: Style;
}
