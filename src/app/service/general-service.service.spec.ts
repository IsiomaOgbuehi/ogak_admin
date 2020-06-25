import { TestBed } from '@angular/core/testing';

import { GeneralServiceService } from './general-service.service';

describe('GeneralServiceService', () => {
  let service: GeneralServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GeneralServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
