import { TestBed } from '@angular/core/testing';
import { CmfChileService } from './cmf-chile.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
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

  it('debería crearse el servicio', () => {
    expect(service).toBeTruthy();
  });

  it('debería obtener valores de los últimos N días', () => {
    const mockResponse: IndicatorResponse = {
      Dolares: [{ Fecha: '2024-03-10', Valor: '820.50' }]
    };
    const params = { indicator: 'dolar', year: 2024, month: 3, day: 10 };

    service.getLastNDaysValues(params).subscribe((response) => {
      expect(response).toEqual(mockResponse);
      expect(typeof response['Dolares'][0].Valor).toBe('string');
    });

    const req = httpMock.expectOne(`${apiUrl}/dolar/posteriores/2024/3/dias/10${queryParams}`);
    expect(req.request.method).toBe('GET');
    req.flush(mockResponse);
  });

  it('debería obtener valores del año actual', () => {
    const mockResponse: IndicatorResponse = {
      Euros: [{ Fecha: '2024-03-10', Valor: '900' }]
    };
    const params = { indicator: 'euro', year: 2024 };

    service.getCurrentYearValues(params).subscribe((response) => {
      expect(response).toEqual(mockResponse);
      expect(typeof response['Euros'][0].Valor).toBe('string');
    });

    const req = httpMock.expectOne(`${apiUrl}/euro/2024${queryParams}`);
    expect(req.request.method).toBe('GET');
    req.flush(mockResponse);
  });

  it('debería obtener valores de los últimos 12 meses', () => {
    const mockResponse: IndicatorResponse = {
      UFs: [{ Fecha: '2023-03-10', Valor: '32000' }]
    };
    const params = { indicator: 'uf', startYear: 2023, startMonth: 3, endYear: 2024, endMonth: 3 };

    service.getLast12MonthsValues(params).subscribe((response) => {
      expect(response).toEqual(mockResponse);
      expect(typeof response['UFs'][0].Valor).toBe('string');
    });

    const req = httpMock.expectOne(`${apiUrl}/uf/periodo/2023/3/2024/3${queryParams}`);
    expect(req.request.method).toBe('GET');
    req.flush(mockResponse);
  });

  it('debería manejar errores al obtener datos', () => {
    const params = { indicator: 'ipc', year: 2024 };

    service.getCurrentYearValues(params).subscribe(
      () => fail('Se esperaba un error'),
      (error) => expect(error.status).toBe(500)
    );

    const req = httpMock.expectOne(`${apiUrl}/ipc/2024${queryParams}`);
    req.flush('Error interno del servidor', { status: 500, statusText: 'Internal Server Error' });
  });
});
