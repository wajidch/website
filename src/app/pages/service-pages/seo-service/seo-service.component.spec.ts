import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SeoServiceComponent } from './seo-service.component';

describe('SeoServiceComponent', () => {
  let component: SeoServiceComponent;
  let fixture: ComponentFixture<SeoServiceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SeoServiceComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SeoServiceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
