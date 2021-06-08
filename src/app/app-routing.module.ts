import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GamesContainerComponent } from './components/containers/games-container/games-container.component';
import { ListingCreateComponent } from './components/listing-create/listing-create.component';
import { GameShowComponent } from './components/show/game-show/game-show.component';

const routes: Routes = [
  { path: '', component: GamesContainerComponent },
  { path: 'games/:gameId/listings', component: ListingCreateComponent },
  { path: 'games/:gameId', component: GameShowComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
