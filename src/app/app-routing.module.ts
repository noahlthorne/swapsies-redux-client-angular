import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GamesListComponent } from './components/games/games-list/games-list.component';

import { AuthGuard } from './services/auth/auth.guard';

const routes: Routes = [
  {
    path: '',
    component: GamesListComponent,
    pathMatch: 'full',
  },
  {
    path: 'games',
    loadChildren: () =>
      import('./components/games/games.module').then(
        (module) => module.GamesModule
      ),
  },
  {
    path: 'auth',
    loadChildren: () =>
      import('./components/auth/auth.module').then(
        (module) => module.AuthModule
      ),
  },
  {
    path: 'users',
    loadChildren: () =>
      import('./components/users/users.module').then(
        (module) => module.UsersModule
      ),
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [AuthGuard],
})
export class AppRoutingModule {}
