import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { ListingSave, ListingShow } from 'src/app/models/Listing.model';
import { map } from 'rxjs/operators';
import { Game } from 'src/app/models/Game.model';

@Injectable({
  providedIn: 'root',
})
export class ListingService {
  private game: Game;
  private listings: ListingShow[] = [];
  private listingsUpdated = new Subject<ListingShow[]>();

  constructor(private http: HttpClient) {}

  getGameListings = (gameId: string) => {
    const gamesListingsUrl: string = `http://localhost:5000/api/games/${gameId}/listings`;
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

  getListingUser = async (userId: string) => {};

  addListing = (gameId: string, listing: ListingShow) => {
    const gamesListingsUrl: string = `http://localhost:5000/api/games/${gameId}/listings`;
    console.log(listing);
    listing.image = listing.image.name;
    this.http.post(gamesListingsUrl, listing).subscribe((response) => {
      console.log(response);
    });
    // this.listings.push(listing);
    this.listingsUpdated.next([...this.listings]);
  };
}
