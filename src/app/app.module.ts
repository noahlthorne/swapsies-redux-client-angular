import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { MatInputModule } from '@angular/material/input';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSelectModule } from '@angular/material/select';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatTabsModule } from '@angular/material/tabs';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { GamesContainerComponent } from './components/games/games-container/games-container.component';
import { GamesListComponent } from './components/games/games-list/games-list.component';
import { GameCardComponent } from './components/games/game-card/game-card.component';
import { GameShowComponent } from './components/games/game-show/game-show.component';
import { ListingsContainerComponent } from './components/listings/listings-container/listings-container.component';
import { ListingsListComponent } from './components/listings/listings-list/listings-list.component';
import { ListingCardComponent } from './components/listings/listing-card/listing-card.component';
import { ListingCreateComponent } from './components/listings/listing-create/listing-create.component';
import { SignupComponent } from './components/auth/signup/signup.component';
import { LoginComponent } from './components/auth/login/login.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    GamesContainerComponent,
    GamesListComponent,
    GameShowComponent,
    GameCardComponent,
    ListingsContainerComponent,
    ListingsListComponent,
    ListingCardComponent,
    ListingCreateComponent,
    SignupComponent,
    LoginComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    MatInputModule,
    MatCardModule,
    MatButtonModule,
    MatToolbarModule,
    MatIconModule,
    MatProgressSpinnerModule,
    MatSelectModule,
    MatPaginatorModule,
    MatTabsModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
