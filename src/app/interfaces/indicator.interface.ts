export interface IndicatorResponse<T = IndicatorValue[]> {
  [key: string]: T;
}

export interface IndicatorValue {
  Valor: string;
  Fecha: string;
}
