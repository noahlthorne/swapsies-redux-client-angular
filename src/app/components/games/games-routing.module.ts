import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from 'src/app/services/auth/auth.guard';
import { ListingCreateComponent } from '../listings/listing-create/listing-create.component';
import { ListingShowComponent } from '../listings/listing-show/listing-show.component';
import { GameShowComponent } from './game-show/game-show.component';

const routes: Routes = [
  {
    path: ':gameId',
    component: GameShowComponent,
  },
  {
    path: ':gameId/listing-new',
    component: ListingCreateComponent,
    canActivate: [AuthGuard],
  },
  {
    path: ':gameId/listings/:listingId',
    component: ListingShowComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class GamesRoutingModule {}
