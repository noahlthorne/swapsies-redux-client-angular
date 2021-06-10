import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GamesListComponent } from './components/games/games-list/games-list.component';
import { ListingCreateComponent } from './components/listings/listing-create/listing-create.component';
import { GameShowComponent } from './components/games/game-show/game-show.component';

const routes: Routes = [
  { path: '', component: GamesListComponent },
  { path: 'games/:gameId/listings', component: ListingCreateComponent },
  { path: 'games/:gameId', component: GameShowComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
