import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { GamesContainerComponent } from './components/containers/games-container/games-container.component';
import { GameComponent } from './components/game/game.component';
import { ListingCreateComponent } from './components/listing-create/listing-create.component';

@NgModule({
  declarations: [
    AppComponent,
    GamesContainerComponent,
    GameComponent,
    ListingCreateComponent,
  ],
  imports: [BrowserModule, AppRoutingModule, HttpClientModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
