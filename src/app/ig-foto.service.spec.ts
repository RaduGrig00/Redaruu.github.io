import { TestBed } from '@angular/core/testing';

import { IgFotoService } from './ig-foto.service';

describe('IgFotoService', () => {
  let service: IgFotoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(IgFotoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
