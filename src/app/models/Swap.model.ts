import { Listing } from './Listing.model';

export interface Swap {
  listingRequested: Listing;
  listingOffered: Listing;
}
