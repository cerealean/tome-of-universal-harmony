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
        this.addedDice.push(reference);
    }
  }

  afterRoll(total: number) {
    console.log('Total is ' + total);
  }

  rollDie() {
    this.rollClicked$.next(true);
  }
}
