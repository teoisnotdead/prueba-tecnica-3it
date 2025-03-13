export interface IndicatorResponse {
  [key: string]: IndicatorValue[];
}

export interface IndicatorValue {
  Valor: string;
  Fecha: string;
}

export interface IndicatorRequestParams {
  indicator: string;
  year: number;
  month?: number;
  day?: number;
}
