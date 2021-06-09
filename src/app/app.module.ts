import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatInputModule } from '@angular/material/input';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { GamesContainerComponent } from './components/games/games-container/games-container.component';
import { GameCardComponent } from './components/games/game-card/game-card.component';
import { ListingCreateComponent } from './components/listings/listing-create/listing-create.component';
import { HeaderComponent } from './components/header/header.component';
import { GameShowComponent } from './components/games/game-show/game-show.component';
import { ListingsListComponent } from './components/listings/listings-list/listings-list.component';

@NgModule({
  declarations: [
    AppComponent,
    GamesContainerComponent,
    GameCardComponent,
    ListingCreateComponent,
    HeaderComponent,
    GameShowComponent,
    ListingsListComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    BrowserAnimationsModule,
    MatInputModule,
    MatCardModule,
    MatButtonModule,
    MatToolbarModule,
    MatIconModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
