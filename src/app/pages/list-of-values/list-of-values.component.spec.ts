import { TestBed } from '@angular/core/testing';
import { ListOfValuesComponent } from './list-of-values.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

describe('ListOfValuesComponent', () => {
  let component: ListOfValuesComponent;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        { 
          provide: ActivatedRoute, 
          useValue: { paramMap: of({ get: () => 'dolar' }) }
        }
      ]
    });

    component = TestBed.createComponent(ListOfValuesComponent).componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
