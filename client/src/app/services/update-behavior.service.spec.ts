import { TestBed } from '@angular/core/testing';

import { UpdateBehaviorService } from './update-behavior.service';

describe('UpdateBehaviorService', () => {
  let service: UpdateBehaviorService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UpdateBehaviorService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
