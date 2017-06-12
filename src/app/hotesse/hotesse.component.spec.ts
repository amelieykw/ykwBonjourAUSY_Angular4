import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HotesseComponent } from './hotesse.component';

describe('HotesseComponent', () => {
  let component: HotesseComponent;
  let fixture: ComponentFixture<HotesseComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HotesseComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HotesseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
