import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListOfValuesComponent } from './list-of-values.component';

describe('ListOfValuesComponent', () => {
  let component: ListOfValuesComponent;
  let fixture: ComponentFixture<ListOfValuesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListOfValuesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListOfValuesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
