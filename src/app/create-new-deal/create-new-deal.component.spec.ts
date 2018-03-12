import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateNewDealComponent } from './create-new-deal.component';

describe('CreateNewDealComponent', () => {
  let component: CreateNewDealComponent;
  let fixture: ComponentFixture<CreateNewDealComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateNewDealComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateNewDealComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
