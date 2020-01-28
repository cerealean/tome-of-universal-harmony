import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-dice-roller',
  templateUrl: './dice-roller.component.html',
  styleUrls: ['./dice-roller.component.scss']
})
export class DiceRollerComponent implements OnInit {
  diceRolls = [];
  numberOfSides = 20;
  numberOfDice = 5;
  constructor() { }

  ngOnInit() {
    this.rollDie();
  }

  rollDie() {
    this.diceRolls = [];
    for (let index = 0; index < this.numberOfDice; index++) {
      this.diceRolls.push(this.getRandomIntInclusive(1, this.numberOfSides));
    }
  }

  getTotal() {
    return this.diceRolls.reduce((total, current) => total + current);
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

    for(let index = 0; index < 10; index++) {
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
