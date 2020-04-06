import { Component, OnInit, ViewChild, ElementRef, Input, OnDestroy, AfterViewInit } from '@angular/core';
import { range } from 'src/app/helpers/number-helpers';
import { Observable, Subscription } from 'rxjs';

/**
 * Idea based on https://codepen.io/vicentemundim/details/cenIh
 */

@Component({
  selector: 'app-20-sided-dice',
  templateUrl: './20-sided-dice.component.html',
  styleUrls: ['./20-sided-dice.component.scss']
})
export class TwentySidedDiceComponent implements OnInit, OnDestroy, AfterViewInit {

  @ViewChild('die') $die: ElementRef<HTMLDivElement>;

  @Input() rollClicked: Observable<boolean>;

  private rollClicked$: Subscription;

  private initialSide = this.getRandomIntInclusive(1, 20);
  private animationDuration = 3000;

  ngOnInit() {
    this.rollClicked$ = this.rollClicked.subscribe(() => {
      this.rollDie();
    });
  }

  ngAfterViewInit() {
    this.rollTo(this.initialSide);
  }

  ngOnDestroy() {
    this.rollClicked$.unsubscribe();
  }

  getRange(num: number): number[] {
    return range(num);
  }

  rollTo(face: number) {
    this.setFace(face);
  }

  rollDie() {
    const dieElement = this.$die.nativeElement;
    dieElement.classList.add('rolling');

    setTimeout(() => {
      dieElement.classList.remove('rolling');

      this.rollTo(this.getRandomIntInclusive(1, 20));
    }, this.animationDuration);
  }

  private setFace(face: number) {
    this.$die.nativeElement.dataset.face = String(face);
  }

  private getRandomIntInclusive(min: number, max: number) {
    const byteArray = new Uint32Array(1);
    window.crypto.getRandomValues(byteArray);

    const range = max - min + 1;
    const maxRange = Math.pow(2, 31) - 1;
    return (byteArray[0] >= Math.floor(maxRange / range) * range)
      ? this.getRandomIntInclusive(min, max)
      : min + (byteArray[0] % range);
  }
}
