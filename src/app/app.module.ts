import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './navbar/navbar.component';
import { LandingComponent } from './landing/landing.component';
import { DiceRollerComponent } from './dice-roller/dice-roller.component';
import { CompendiumEditorComponent } from './compendium-editor/compendium-editor.component';
import { NgxPaginationModule } from 'ngx-pagination';
import { DigitOnlyDirective } from './directives/digit-only/digit-only.directive';
import { SixSidedDiceComponent } from './dice-roller/6-sided-dice/6-sided-dice.component';
import { TwentySidedDiceComponent } from './dice-roller/20-sided-dice/20-sided-dice.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    LandingComponent,
    DiceRollerComponent,
    CompendiumEditorComponent,
    DigitOnlyDirective,
    SixSidedDiceComponent,
    TwentySidedDiceComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    NgxPaginationModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
