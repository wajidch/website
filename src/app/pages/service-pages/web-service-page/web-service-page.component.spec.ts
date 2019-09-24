import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WebServicePageComponent } from './web-service-page.component';

describe('WebServicePageComponent', () => {
  let component: WebServicePageComponent;
  let fixture: ComponentFixture<WebServicePageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WebServicePageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WebServicePageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
