import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LandingComponent } from './landing/landing.component';
import { DiceRollerComponent } from './dice-roller/dice-roller.component';


const routes: Routes = [
  {
    component: LandingComponent,
    path: 'landing'
  },
  {
    path: 'utilities',
    children: [
      {
        component: DiceRollerComponent,
        path: 'dice-roller'
      }
    ]
  },
  {
    pathMatch: 'full',
    path: '**',
    redirectTo: 'landing'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
