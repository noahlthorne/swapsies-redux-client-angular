import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GamesContainerComponent } from './components/containers/games-container/games-container.component';
import { ListingCreateComponent } from './components/listing-create/listing-create.component';

const routes: Routes = [
  { path: '', component: GamesContainerComponent },
  { path: 'listings', component: ListingCreateComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
