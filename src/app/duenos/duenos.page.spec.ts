import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DuenosPage } from './duenos.page';

describe('DuenosPage', () => {
  let component: DuenosPage;
  let fixture: ComponentFixture<DuenosPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(DuenosPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
