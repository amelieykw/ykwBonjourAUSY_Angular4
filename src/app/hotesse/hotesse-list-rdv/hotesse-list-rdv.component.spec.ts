import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HotesseListRdvComponent } from './hotesse-list-rdv.component';

describe('HotesseListRdvComponent', () => {
  let component: HotesseListRdvComponent;
  let fixture: ComponentFixture<HotesseListRdvComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HotesseListRdvComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HotesseListRdvComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
