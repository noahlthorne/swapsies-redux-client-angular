import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { Listing } from 'src/app/models/Listing.model';
import { map } from 'rxjs/operators';
import { Game } from 'src/app/models/Game.model';
import { environment } from '../../../environments/environment';

const SERVER_URL = environment.apiUrl;

@Injectable({
  providedIn: 'root',
})
export class ListingService {
  private game: Game;
  private listings: Listing[] = [];
  private listingsUpdated = new Subject<Listing[]>();

  constructor(private http: HttpClient) {}

  getGameListings = (gameId: string) => {
    const gamesListingsUrl: string = `${SERVER_URL}/games/${gameId}/listings`;
    return this.http
      .get<{ listings: any }>(gamesListingsUrl)
      .pipe(
        map((listingData) => {
          return listingData.listings.map((listing: any) => {
            this.game = listing.game;
            return {
              id: listing._id,
              status: listing.status,
              user: listing.user,
              game: listing.game,
              condition: listing.condition,
            };
          });
        })
      )
      .subscribe((transformedListings) => {
        this.listings = transformedListings;
        this.listingsUpdated.next([...this.listings]);
      });
  };

  getListingUpdateListener = () => {
    return this.listingsUpdated.asObservable();
  };

  getListing(listingId: string) {
    return this.http.get<any>(`${SERVER_URL}/listings/${listingId}`);
  }

  addListing = (gameId: string, condition: string, image: File | string) => {
    const gamesListingsUrl: string = `${SERVER_URL}/games/${gameId}/listings`;
    const listingData = new FormData();
    listingData.append('game', gameId);
    listingData.append('condition', condition);
    listingData.append('image', image, 'test');
    this.http
      .post<{ listing: any }>(gamesListingsUrl, listingData)
      .subscribe((response) => {
        this.listings.push({
          ...response.listing,
          id: response.listing._id,
        });
        this.listingsUpdated.next([...this.listings]);
      });
  };
}
