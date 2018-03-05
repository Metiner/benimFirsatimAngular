import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SingleDealComponent } from './single-deal.component';

describe('SingleDealComponent', () => {
  let component: SingleDealComponent;
  let fixture: ComponentFixture<SingleDealComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SingleDealComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SingleDealComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
