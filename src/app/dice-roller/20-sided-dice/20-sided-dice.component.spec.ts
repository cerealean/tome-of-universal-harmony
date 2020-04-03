import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TwentySidedDiceComponent } from './20-sided-dice.component';

describe('DiceListComponent', () => {
  let component: TwentySidedDiceComponent;
  let fixture: ComponentFixture<TwentySidedDiceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TwentySidedDiceComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TwentySidedDiceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
