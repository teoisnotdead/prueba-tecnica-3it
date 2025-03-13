export interface IndicatorResponse {
  [key: string]: IndicatorValue[];
}

export interface IndicatorValue {
  Valor: string;
  Fecha: string;
}