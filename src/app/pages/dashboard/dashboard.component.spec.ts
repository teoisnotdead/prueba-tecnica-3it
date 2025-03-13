import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DashboardComponent } from './dashboard.component';
import { Router } from '@angular/router';
import { INDICATORS } from '../../constants/indicators';

describe('DashboardComponent', () => {
  let component: DashboardComponent;
  let fixture: ComponentFixture<DashboardComponent>;
  let routerSpy: jasmine.SpyObj<Router>;

  beforeEach(async () => {
    routerSpy = jasmine.createSpyObj('Router', ['navigate']);

    await TestBed.configureTestingModule({
      imports: [DashboardComponent],
      providers: [{ provide: Router, useValue: routerSpy }],
    }).compileComponents();

    fixture = TestBed.createComponent(DashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('debería crearse', () => {
    expect(component).toBeTruthy();
  });

  it('deberia tener una lista de los indicadores', () => {
    expect(component.indicators).toEqual(INDICATORS);
  });

  it('deberia navegar a la vista lista de valores cuando se llama litofValue', () => {
    const indicatorId = 'dolar';
    component.listOfValue(indicatorId);
    expect(routerSpy.navigate).toHaveBeenCalledWith(['/valores', indicatorId]);
  });

  it('deberia navegar a la vista lista de valores cuando se llama detailsIndicator', () => {
    const indicatorId = 'euro';
    component.detailsIndicator(indicatorId);
    expect(routerSpy.navigate).toHaveBeenCalledWith(['/detalles', indicatorId]);
  });
});
