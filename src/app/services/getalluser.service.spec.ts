import { TestBed } from '@angular/core/testing';

import { GetalluserService } from './getalluser.service';

describe('GetalluserService', () => {
  let service: GetalluserService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GetalluserService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
