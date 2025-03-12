import { TestBed } from '@angular/core/testing';

import { CmfChileService } from './cmf-chile.service';

describe('CmfChileService', () => {
  let service: CmfChileService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CmfChileService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
