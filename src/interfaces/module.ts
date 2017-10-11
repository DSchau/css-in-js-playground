export interface Module {
  [key: string]: string;
  header: string;
  index: string;
  login: string;
}

export interface Transformed {
  code: string;
  map: any;
}

export interface TransformedModule {
  [key: string]: Transformed;
  header: Transformed;
  index: Transformed;
  login: Transformed;
}
