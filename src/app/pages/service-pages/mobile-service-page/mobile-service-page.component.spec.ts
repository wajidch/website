import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MobileServicePageComponent } from './mobile-service-page.component';

describe('MobileServicePageComponent', () => {
  let component: MobileServicePageComponent;
  let fixture: ComponentFixture<MobileServicePageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MobileServicePageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MobileServicePageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
