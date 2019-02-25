import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CuentasPage } from './cuentas.page';

describe('CuentasPage', () => {
  let component: CuentasPage;
  let fixture: ComponentFixture<CuentasPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CuentasPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CuentasPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
