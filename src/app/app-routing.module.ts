import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GamesListComponent } from './components/games/games-list/games-list.component';
import { ListingCreateComponent } from './components/listings/listing-create/listing-create.component';
import { GameShowComponent } from './components/games/game-show/game-show.component';
import { LoginComponent } from './components/auth/login/login.component';
import { SignupComponent } from './components/auth/signup/signup.component';
import { AuthGuard } from './services/auth/auth.guard';

const routes: Routes = [
  {
    path: '',
    component: GamesListComponent,
    pathMatch: 'full',
  },
  {
    path: 'games/:gameId/listing-new',
    component: ListingCreateComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'games/:gameId',
    component: GameShowComponent,
  },
  {
    path: 'sign-up',
    component: SignupComponent,
  },
  {
    path: 'login',
    component: LoginComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [AuthGuard],
})
export class AppRoutingModule {}
