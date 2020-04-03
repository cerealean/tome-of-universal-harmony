import { Component, OnInit, ViewChild, ElementRef, Input, AfterViewInit, OnChanges, SimpleChanges, OnDestroy } from '@angular/core';
import { range } from 'src/app/helpers/number-helpers';
import { Observable, Subscription } from 'rxjs';

@Component({
  selector: 'app-20-sided-dice',
  templateUrl: './20-sided-dice.component.html',
  styleUrls: ['./20-sided-dice.component.scss']
})
export class TwentySidedDiceComponent implements OnInit, AfterViewInit, OnChanges, OnDestroy {

  @ViewChild('die') $die: ElementRef<HTMLDivElement>;

  @Input() numberOfDice: number;
  @Input() rollClicked: Observable<boolean>;

  private rollClicked$: Subscription;

  private initialSide = 1;
  private animationDuration = 3000;

  private diceElements: HTMLDivElement[] = [];

  ngOnInit() {
    this.rollClicked$ = this.rollClicked.subscribe(() => {
      this.diceElements.forEach(die => {
        this.rollDice(die);
      });
    });
  }

  ngOnDestroy() {
    this.rollClicked$.unsubscribe();
  }

  ngAfterViewInit() {
    this.diceElements = Array.from(document.querySelectorAll('div .die'));
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes.numberOfDice) {
      setTimeout(() => {
        this.diceElements = Array.from(document.querySelectorAll('div .die'));
      }, 200);
    }
  }

  getRange(num: number): number[] {
    return range(num);
  }

  rollTo(dieElement: HTMLDivElement, face: number) {
    this.setFace(dieElement, face);
  }

  rollDice(dieElement: HTMLDivElement) {
    dieElement.classList.add('rolling');

    setTimeout(() => {
      dieElement.classList.remove('rolling');

      this.rollTo(dieElement, this.getRandomIntInclusive(1, 20));
    }, this.animationDuration);
  }

  private setFace(dieElement: HTMLDivElement, face: number) {
    dieElement.dataset.face = String(face);
  }

  private getRandomIntInclusive(min: number, max: number) {
    // const byteArray = this.getRandomCryptoArray();
    const byteArray = new Uint32Array(1);
    window.crypto.getRandomValues(byteArray);

    const range = max - min + 1;
    const maxRange = Math.pow(2, 31) - 1;
    return (byteArray[0] >= Math.floor(maxRange / range) * range)
      ? this.getRandomIntInclusive(min, max)
      : min + (byteArray[0] % range);
  }


  // private shuffleArray(array: string | any[]) {
  //   for (let i = array.length - 1; i > 0; i--) {
  //     const j = Math.floor(Math.random() * (i + 1));
  //     [array[i], array[j]] = [array[j], array[i]];
  //   }
  // }

}
