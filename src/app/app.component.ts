import { Component } from '@angular/core';
import { Listing } from './models/Listing.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'swapsies-redux-client';
  listings: Listing[] = [];

  onListingAdded = async (listing: Listing) => {
    this.listings.push(listing);
  };
}
