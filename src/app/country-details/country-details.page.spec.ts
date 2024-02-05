import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { CountryDetailsPage } from './country-details.page';

describe('CountryDetailsPage', () => {
  let component: CountryDetailsPage;
  let fixture: ComponentFixture<CountryDetailsPage>;

  beforeEach(waitForAsync(() => {
    fixture = TestBed.createComponent(CountryDetailsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
