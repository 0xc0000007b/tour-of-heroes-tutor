import { TestBed } from '@angular/core/testing';

import { StyleManagerService } from '../components/additional-components/theme-changer/style-manager.service';

describe('StyleManagerService', () => {
  let service: StyleManagerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(StyleManagerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
