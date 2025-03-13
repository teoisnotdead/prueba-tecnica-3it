import { TestBed } from '@angular/core/testing';
import { DetailsComponent } from './details.component';
import { CmfChileService } from '../../services/cmf-chile.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

describe('DetailsComponent', () => {
  let component: DetailsComponent;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        CmfChileService,
        { 
          provide: ActivatedRoute, 
          useValue: { paramMap: of({ get: () => 'dolar' }) }
        }
      ]
    });

    component = TestBed.createComponent(DetailsComponent).componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
