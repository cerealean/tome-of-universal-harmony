import { Component, OnInit, ComponentFactoryResolver, ViewChild, ViewContainerRef, ComponentRef } from '@angular/core';
import { Subject } from 'rxjs';
import { TwentySidedDiceComponent } from './20-sided-dice/20-sided-dice.component';

@Component({
  selector: 'app-dice-roller',
  templateUrl: './dice-roller.component.html',
  styleUrls: ['./dice-roller.component.scss']
})
export class DiceRollerComponent implements OnInit {
  public rollClicked$: Subject<boolean>;
  public addedDice: ComponentRef<TwentySidedDiceComponent>[] = [];

  @ViewChild('diceWrapper', { read: ViewContainerRef }) diceWrapper: ViewContainerRef;

  constructor(private readonly componentFactoryResolver: ComponentFactoryResolver) { }

  ngOnInit() {
    this.rollClicked$ = new Subject<boolean>();
  }

  addDie(sides: number) {
    switch (sides) {
      case 20:
        const newDie = this.componentFactoryResolver.resolveComponentFactory(TwentySidedDiceComponent);
        const reference = this.diceWrapper.createComponent(newDie);
        reference.instance.rollClicked = this.rollClicked$;
        const rawr = reference.location.nativeElement as HTMLDivElement;
        const parent = rawr.parentElement;
        parent.style.position = 'relative';
        rawr.style.position = 'absolute';
        const top = (this.calculateDicePositionWithinContainer(parent.clientHeight)) + 'px';
        rawr.style.top = top;
        rawr.style.left = this.calculateDicePositionWithinContainer(parent.clientWidth) + 'px';
        console.log(top);
        this.addedDice.push(reference);
    }
  }

  afterRoll(total: number) {
    console.log('Total is ' + total);
  }

  rollDie() {
    this.rollClicked$.next(true);
  }

  private calculateDicePositionWithinContainer(max: number) {
    const num = this.getRandomIntInclusive(0, max) - 200;

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
