import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, catchError, throwError } from 'rxjs';
import { IndicatorResponse } from '../interfaces/indicator.interface';

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

  getLast30DaysValues(
    indicator: string,
    year: number,
    month: number,
    day: number
  ): Observable<IndicatorResponse> {
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
    indicator: string,
    year: number
  ): Observable<IndicatorResponse> {
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
}
