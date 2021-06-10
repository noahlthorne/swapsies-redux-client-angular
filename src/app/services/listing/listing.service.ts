import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { Listing } from 'src/app/models/Listing.model';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class ListingService {
  private listings: Listing[] = [];
  private listingsUpdated = new Subject<Listing[]>();

  constructor(private http: HttpClient) {}

  getGameListings = (gameId: string) => {
    const gamesListingsUrl: string = `http://localhost:5000/api/games/${gameId}/listings`;
    return this.http
      .get<{ listings: any }>(gamesListingsUrl)
      .pipe(
        map((listingData) => {
          return listingData.listings.map((listing: any) => {
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

  addListing = (listing: Listing) => {
    this.listings.push(listing);
    this.listingsUpdated.next([...this.listings]);
  };
}
