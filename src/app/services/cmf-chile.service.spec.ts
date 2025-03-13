import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { CmfChileService } from './cmf-chile.service';
import { environment } from '../../environments/environment';
import { IndicatorResponse } from '../interfaces/indicator.interface';

describe('CmfChileService', () => {
  let service: CmfChileService;
  let httpMock: HttpTestingController;
  const apiUrl = environment.baseUrl;
  const apiKey = environment.apiKey;
  const queryParams = `?apikey=${apiKey}&formato=json`;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [CmfChileService]
    });

    service = TestBed.inject(CmfChileService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('debería obtener valores de los últimos N días', () => {
    const mockResponse: IndicatorResponse = { Dolares: [{ Fecha: '2024-03-10', Valor: '820.50' }] };
    const params = { indicator: 'dolar', year: 2024, month: 3, day: 10 };

    service.getLastNDaysValues(params).subscribe((response) => {
      expect(response).toEqual(mockResponse);
    });

    const req = httpMock.expectOne(`${apiUrl}/dolar/posteriores/2024/3/dias/10${queryParams}`); // 🔹 Agregamos los parámetros
    expect(req.request.method).toBe('GET');
    req.flush(mockResponse);
  });

 
});
