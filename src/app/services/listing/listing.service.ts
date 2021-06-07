import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { Listing } from 'src/app/models/Listing.model';

@Injectable({
  providedIn: 'root',
})
export class ListingService {
  constructor(private http: HttpClient) {}
  private listings: Listing[] = [];
  private listingsUpdated = new Subject<Listing[]>();

  getListingUpdateListener = () => {
    return this.listingsUpdated.asObservable();
  };

  addListing = (listing: Listing) => {
    this.listings.push(listing);
    this.listingsUpdated.next([...this.listings]);
  };
}
