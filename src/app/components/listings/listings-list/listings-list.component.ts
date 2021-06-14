import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { Subscription } from 'rxjs';
import { ListingShow } from 'src/app/models/Listing.model';
import { ListingService } from 'src/app/services/listing/listing.service';

@Component({
  selector: 'app-listings-list',
  templateUrl: './listings-list.component.html',
  styleUrls: ['./listings-list.component.scss'],
})
export class ListingsListComponent implements OnInit, OnDestroy {
  listings: ListingShow[] = [];
  private listingsSub: Subscription;
  private gameId: string;

  constructor(
    private listingService: ListingService,
    public route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe((paramMap: ParamMap) => {
      if (paramMap.has('gameId')) {
        this.gameId = paramMap.get('gameId')!;
        this.listingService.getGameListings(this.gameId);
      }
    });
    this.listingsSub = this.listingService
      .getListingUpdateListener()
      .subscribe((listings: ListingShow[]) => {
        this.listings = listings;
      });
  }

  ngOnDestroy() {
    if (this.listingsSub) {
      this.listingsSub.unsubscribe();
    }
  }
}
