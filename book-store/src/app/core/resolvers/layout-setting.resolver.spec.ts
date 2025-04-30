import { TestBed } from '@angular/core/testing';
import { ResolveFn } from '@angular/router';

import { layoutSettingResolver } from './layout-setting.resolver';

describe('layoutSettingResolver', () => {
  const executeResolver: ResolveFn<boolean> = (...resolverParameters) => 
      TestBed.runInInjectionContext(() => layoutSettingResolver(...resolverParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeResolver).toBeTruthy();
  });
});
