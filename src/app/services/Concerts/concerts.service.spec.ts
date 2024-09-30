/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { ConcertsService } from './concerts.service';

describe('Service: Concerts', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ConcertsService]
    });
  });

  it('should ...', inject([ConcertsService], (service: ConcertsService) => {
    expect(service).toBeTruthy();
  }));
});
