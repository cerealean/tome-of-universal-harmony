import { Component, OnInit, ViewChild, ElementRef, Input, OnDestroy, AfterViewInit } from '@angular/core';
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

  @Input() rollClicked?: Observable<boolean>;
  @Input() initialSide?: number;

  private rollClicked$: Subscription;

  private animationDuration = 3000;

  ngOnInit() {
    if (this.rollClicked) {
      this.rollClicked$ = this.rollClicked.subscribe(() => {
        this.rollDice();
      });
    }
  }

  ngOnDestroy() {
    if (this.rollClicked$) {
      this.rollClicked$.unsubscribe();
    }
  }

  ngAfterViewInit() {
    if (this.initialSide) {
      setTimeout(() => {
        this.rollTo(this.initialSide);
      }, 1);
    }
  }

  rollDice() {
    if (!this.rollClicked) {
      return;
    }
    const dieElement = this.$die.nativeElement;
    dieElement.classList.add('rolling');

    setTimeout(() => {
      dieElement.classList.remove('rolling');

      this.rollTo(this.getRandomIntInclusive(1, 20));
    }, this.animationDuration);
  }

  private rollTo(face: number) {
    this.setFace(face);
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
