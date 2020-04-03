import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SixSidedDiceComponent } from './6-sided-dice.component';

describe('DiceListComponent', () => {
  let component: SixSidedDiceComponent;
  let fixture: ComponentFixture<SixSidedDiceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SixSidedDiceComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SixSidedDiceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
