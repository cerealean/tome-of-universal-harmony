import { Component, OnInit, ViewChild, ElementRef, Input, AfterViewInit, OnDestroy } from '@angular/core';
import { range } from 'src/app/helpers/number-helpers';
import { Observable, Subscription } from 'rxjs';
import anime from 'animejs/lib/anime.es.js';

/**
 * Idea based on https://codepen.io/vicentemundim/details/cenIh
 */

@Component({
  selector: 'app-20-sided-dice',
  templateUrl: './20-sided-dice.component.html',
  styleUrls: ['./20-sided-dice.component.scss']
})
export class TwentySidedDiceComponent implements OnInit, AfterViewInit, OnDestroy {

  @ViewChild('die') $die: ElementRef<HTMLDivElement>;

  @Input() rollClicked: Observable<boolean>;

  private rollClicked$: Subscription;
  private initialSide = 1;
  private animationDuration = 3000;
  private timeoutId: any;

  private mapping = new Map<number, { x: number, y: number, z: number }>([
    [1, { x: -53, y: 0, z: 0 }],
    [2, { x: -53, y: (360 / 5), z: 0 }],
    [3, { x: -53, y: (360 / 5) * 2, z: 0 }],
    [4, { x: -53, y: (360 / 5) * 3, z: 0 }],
    [5, { x: -53, y: (360 / 5) * 4, z: 0 }],
    [6, { x: 11, y: (360 / 5) * 5, z: 180 }],
    [7, { x: 11, y: (360 / 5) * 6, z: 180 }],
    [8, { x: 11, y: (360 / 5) * 7, z: 180 }],
    [9, { x: 11, y: (360 / 5) * 8, z: 180 }],
    [10, { x: 11, y: (360 / 5) * 9, z: 180 }],
  ]);

  ngOnInit() {
    this.rollClicked$ = this.rollClicked.subscribe(() => {
      this.rollDie();
    });
  }

  ngOnDestroy() {
    this.rollClicked$.unsubscribe();
  }

  ngAfterViewInit() {
    // this.rollTo(this.getRandomIntInclusive(1, 20));
  }

  getRange(num: number): number[] {
    return range(num);
  }

  rollTo(face: number) {
    this.setFace(face);
  }

  rollDie() {
    const dieElement = this.$die.nativeElement;
    const newNumber = this.getRandomIntInclusive(1, 10);
    anime({
      targets: dieElement,
      rotateX: this.mapping.get(newNumber).x,
      rotateZ: this.mapping.get(newNumber).z,
      rotateY: this.mapping.get(newNumber).y,
      // translateZ: 33.5,
      // translateY: -15,
      // duration: 400
    });
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
