export interface IndicatorResponse<T = IndicatorValue[]> {
  [key: string]: T;
}

export interface IndicatorValue {
  valor: string;
  fecha: string;
}
