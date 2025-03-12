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

  getCurrentValue(indicator: string): Observable<IndicatorResponse> {
    const url = `${this.apiUrl}/${indicator}`;
    return this.http
      .get<IndicatorResponse>(url, { params: this.getParams() })
      .pipe(
        catchError((error) => {
          console.error('Error al obtener datos de', indicator, error);
          return throwError(
            () => new Error('Error al obtener datos del indicador')
          );
        })
      );
  }
}
