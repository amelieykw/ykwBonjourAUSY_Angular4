import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HotesseFormComponent } from './hotesse-form.component';

describe('HotesseFormComponent', () => {
  let component: HotesseFormComponent;
  let fixture: ComponentFixture<HotesseFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HotesseFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HotesseFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
