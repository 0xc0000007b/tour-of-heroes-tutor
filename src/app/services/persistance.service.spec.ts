import { TestBed } from '@angular/core/testing';

import { PersistanceService } from '../components/additional-components/theme-changer/persistance.service';

describe('PersistanceService', () => {
  let service: PersistanceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PersistanceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
