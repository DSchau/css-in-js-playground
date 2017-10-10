export interface Module {
  [key: string]: string;
  Header: string;
  Index: string;
  Login: string;
}

export interface Transformed {
  code: string;
  map: any;
}

export interface TransformedModule {
  [key: string]: Transformed;
  Header: Transformed;
  Index: Transformed;
  Login: Transformed;
}
