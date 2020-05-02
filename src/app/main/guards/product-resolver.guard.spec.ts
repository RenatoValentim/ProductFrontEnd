import { TestBed } from '@angular/core/testing';

import { ProductResolverGuard } from './product-resolver.guard';

describe('ProductResolverGuard', () => {
  let guard: ProductResolverGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(ProductResolverGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
