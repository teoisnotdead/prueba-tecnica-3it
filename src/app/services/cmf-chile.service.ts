import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, catchError, throwError } from 'rxjs';
import {
  IndicatorRequestParams,
  IndicatorResponse,
} from '../interfaces/indicator.interface';

@Injectable({
  providedIn: 'root',
})
export class CmfChileService {
  private apiUrl = environment.baseUrl;
  private apiKey = environment.apiKey;

  private getParams(): HttpParams {
    return new HttpParams().set('apikey', this.apiKey).set('formato', 'json');
  }

  constructor(private readonly http: HttpClient) {}

  getLastNDaysValues(
    params: IndicatorRequestParams
  ): Observable<IndicatorResponse> {
    const { indicator, year, month, day } = params;
    const url = `${this.apiUrl}/${indicator}/posteriores/${year}/${month}/dias/${day}`;
    return this.http
      .get<IndicatorResponse>(url, { params: this.getParams() })
      .pipe(
        catchError((error) => {
          console.error('Error al obtener los valores:', error);
          return throwError(error);
        })
      );
  }

  getCurrentYearValues(
    params: IndicatorRequestParams
  ): Observable<IndicatorResponse> {
    const { indicator, year } = params;
    const url = `${this.apiUrl}/${indicator}/${year}`;

    return this.http
      .get<IndicatorResponse>(url, { params: this.getParams() })
      .pipe(
        catchError((error) => {
          console.error('Error al obtener los valores:', error);
          return throwError(error);
        })
      );
  }

  getLast12MonthsValues(params: {
    indicator: string;
    startYear: number;
    startMonth: number;
    endYear: number;
    endMonth: number;
  }): Observable<IndicatorResponse> {
    const { indicator, startYear, startMonth, endYear, endMonth } = params;
    const url = `${this.apiUrl}/${indicator}/periodo/${startYear}/${startMonth}/${endYear}/${endMonth}`;

    return this.http
      .get<IndicatorResponse>(url, { params: this.getParams() })
      .pipe(
        catchError((error) => {
          console.error('Error al obtener los valores:', error);
          throw error;
        })
      );
  }
}
