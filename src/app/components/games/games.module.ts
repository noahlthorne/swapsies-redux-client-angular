import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { ListingsModule } from '../../components/listings/listings.module';
import { GamesContainerComponent } from './games-container/games-container.component';
import { GamesListComponent } from './games-list/games-list.component';
import { GameCardComponent } from './game-card/game-card.component';
import { GameShowComponent } from './game-show/game-show.component';
import { GamesRoutingModule } from './games-routing.module';
import { AngularMaterialModule } from 'src/app/angular-material.module';

@NgModule({
  declarations: [
    GamesContainerComponent,
    GameShowComponent,
    GameCardComponent,
    GamesListComponent,
  ],
  imports: [
    CommonModule,
    AngularMaterialModule,
    RouterModule,
    ReactiveFormsModule,
    FormsModule,
    ListingsModule,
    GamesRoutingModule,
  ],
})
export class GamesModule {}
