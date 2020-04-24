import { Component, OnInit, ComponentFactoryResolver, ViewChild, ViewContainerRef, ComponentRef } from '@angular/core';
import { Subject } from 'rxjs';
import { TwentySidedDiceComponent } from './20-sided-dice/20-sided-dice.component';

class DiceInfo {
  get left() {
    return Number(this.nativeElement.style.left.replace('px', ''));
  }
  set left(value: number) {
    this.nativeElement.style.left = String(value) + 'px';
  }
  get top() {
    return Number(this.nativeElement.style.top.replace('px', ''));
  }
  set top(value: number) {
    this.nativeElement.style.top = String(value) + 'px';
  }
  get height() {
    return Number(this.nativeElement.clientHeight);
  }
  get width() {
    return Number(this.nativeElement.clientWidth);
  }
  get parent() {
    return this.nativeElement.parentElement;
  }
  get styles() {
    return this.nativeElement.style;
  }

  get nativeElement(): HTMLDivElement {
    return this.element.location.nativeElement;
  }
  constructor(public readonly element: ComponentRef<TwentySidedDiceComponent>) { }
}

@Component({
  selector: 'app-dice-roller',
  templateUrl: './dice-roller.component.html',
  styleUrls: ['./dice-roller.component.scss']
})
export class DiceRollerComponent implements OnInit {
  public rollClicked$: Subject<boolean>;
  public addedDice: DiceInfo[] = [];
  public loading = false;

  @ViewChild('diceWrapper', { read: ViewContainerRef }) diceWrapper: ViewContainerRef;

  constructor(private readonly componentFactoryResolver: ComponentFactoryResolver) { }

  ngOnInit() {
    this.rollClicked$ = new Subject<boolean>();
  }

  addDie(sides: number) {
    this.loading = true;
    let di: DiceInfo;
    try {
      switch (sides) {
        case 20:
          const newDie = this.componentFactoryResolver.resolveComponentFactory(TwentySidedDiceComponent);
          const reference = this.diceWrapper.createComponent(newDie);
          reference.instance.rollClicked = this.rollClicked$;
          di = new DiceInfo(reference);
          this.placeDie(di);
          this.addedDice.push(di);
      }
    } catch {
      this.loading = false;
      di.element.destroy();
      alert('Dice tray is full :(');
    }
    this.loading = false;
  }

  afterRoll(total: number) {
    console.log('Total is ' + total);
  }

  rollDie() {
    if (this.loading) {
      return;
    }
    this.rollClicked$.next(true);
  }

  private placeDie(di: DiceInfo) {
    di.styles.position = 'absolute';
    console.group('Die number ' + (this.addedDice.length + 1));
    this.calculatePosition(di);
    // di.top = position.top;
    // di.left = position.left;
    console.groupEnd();
  }

  private calculatePosition(di: DiceInfo, depth: number = 0) {
    console.log(depth);
    if (depth >= 1000) {
      throw new Error('Maximum depth exceeded');
    }
    di.top = this.randomWithMin0(di.parent.clientHeight);
    di.left = this.randomWithMin0(di.parent.clientWidth);
    const rect1 = di.nativeElement.getBoundingClientRect();
    if (this.addedDice.some(this.doesOverlapWithAnother(rect1))) {
      this.calculatePosition(di, depth + 1);
    }
  }

  private doesOverlapWithAnother(rect1: DOMRect): (value: DiceInfo, index: number, array: DiceInfo[]) => boolean {
    return di2 => {
      const rect2 = di2.nativeElement.getBoundingClientRect();
      return !(rect1.right < rect2.left ||
        rect1.left > rect2.right ||
        rect1.bottom < rect2.top ||
        rect1.top > rect2.bottom);
    };
  }

  private randomWithMin0(max: number) {
    const num = this.getRandomIntInclusive(0, max);

    return num > 0 ? num : 0;
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
