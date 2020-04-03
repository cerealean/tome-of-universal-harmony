import { Component, OnInit } from '@angular/core';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-dice-roller',
  templateUrl: './dice-roller.component.html',
  styleUrls: ['./dice-roller.component.scss']
})
export class DiceRollerComponent implements OnInit {
  diceRolls = [];
  numberOfSides = 6;
  numberOfDice = 2;

  public rollClicked$: Subject<boolean>;

  constructor() { }

  ngOnInit() {
    this.rollClicked$ = new Subject<boolean>();
  }

  getRange(num: number): number[] {
    return Array.from(Array(num).keys()).map(n => n + 1);
  }

  afterRoll(total: number) {
    console.log('Total is ' + total);
  }

  rollDie() {
    this.rollClicked$.next(true);
  }

}
