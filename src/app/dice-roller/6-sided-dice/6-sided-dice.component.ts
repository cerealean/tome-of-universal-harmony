import { Component, OnInit, Input, OnDestroy, Output, EventEmitter, OnChanges, SimpleChanges } from '@angular/core';
import { range } from 'src/app/helpers/number-helpers';
import { Observable, Subscription } from 'rxjs';

@Component({
  selector: 'app-6-sided-dice',
  templateUrl: './6-sided-dice.component.html',
  styleUrls: ['./6-sided-dice.component.scss']
})
export class SixSidedDiceComponent implements OnInit, OnDestroy, OnChanges {
  @Input() numberOfSides: number;
  @Input() numberOfDice: number;
  @Input() rollClicked: Observable<boolean>;

  @Output() afterRollEvent = new EventEmitter<number>();

  public numberOfSidesRange: number[] = [];
  public numberOfDiceRange: number[] = [];

  private rollClicked$: Subscription;

  constructor() { }

  ngOnChanges(changes: SimpleChanges): void {
    console.log(changes);
    if (changes.numberOfDice) {
      this.numberOfDiceRange = range(changes.numberOfDice.currentValue);
    }
    if (changes.numberOfSides) {
      this.numberOfSidesRange = range(changes.numberOfSides.currentValue);
    }
  }

  ngOnInit(): void {
    this.rollClicked$ = this.rollClicked.subscribe(() => {
      this.rollDice();
    });
  }

  ngOnDestroy() {
    this.rollClicked$.unsubscribe();
  }

  getRange(num: number): number[] {
    return range(num);
  }

  rollDice() {
    const dice = [...Array.from(document.querySelectorAll('.die-list'))] as HTMLOListElement[];
    const totals = [];
    dice.forEach(die => {
      this.toggleClasses(die);
      const randomNum = this.getRandomIntInclusive(1, 6);
      die.dataset.roll = randomNum;
      totals.push(randomNum);
    });

    setTimeout(() => {
      const sum = totals.reduce((total, current) => total + current);
      this.afterRollEvent.emit(sum);
    }, 2000);
  }

  toggleClasses(die) {
    die.classList.toggle('odd-roll');
    die.classList.toggle('even-roll');
  }

  getRandomNumber(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  private getRandomIntInclusive(min: number, max: number) {
    // const byteArray = this.getRandomCryptoArray();
    const byteArray = new Uint32Array(1);
    window.crypto.getRandomValues(byteArray);

    const range = max - min + 1;
    const max_range = Math.pow(2, 31) - 1;
    return (byteArray[0] >= Math.floor(max_range / range) * range)
      ? this.getRandomIntInclusive(min, max)
      : min + (byteArray[0] % range);
  }

  private getRandomCryptoArray() {
    let randoms = [];

    for (let index = 0; index < 10; index++) {
      const byteArray = new Uint32Array(1);
      window.crypto.getRandomValues(byteArray);
      randoms.push(byteArray);
    }

    this.shuffleArray(randoms);

    return randoms.shift();
  }

  private shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
      let j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
  }

}
