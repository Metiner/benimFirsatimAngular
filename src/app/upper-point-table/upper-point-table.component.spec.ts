import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UpperPointTableComponent } from './upper-point-table.component';

describe('UpperPointTableComponent', () => {
  let component: UpperPointTableComponent;
  let fixture: ComponentFixture<UpperPointTableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UpperPointTableComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UpperPointTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
