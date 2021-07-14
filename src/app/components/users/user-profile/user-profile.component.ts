import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { Subscription } from 'rxjs';
import { Listing } from 'src/app/models/Listing.model';
import { Swap } from 'src/app/models/Swap.model';
import { ListingService } from 'src/app/services/listing/listing.service';
import { SwapService } from 'src/app/services/swap/swap.service';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss'],
})
export class UserProfileComponent implements OnInit {
  isLoading: boolean = false;
  userId: string;
  listings: Listing[];
  swaps: Swap[];

  constructor(
    public route: ActivatedRoute,
    private swapService: SwapService,
    private listingService: ListingService
  ) {}

  ngOnInit(): void {
    this.isLoading = true;
    console.log('initializing');
    this.route.paramMap.subscribe((paramMap: ParamMap) => {
      if (paramMap.has('userId')) {
        this.userId = paramMap.get('userId')!;
        this.listingService.getUserListings(this.userId);
        this.swapService.getInputsSwaps(this.userId, 'users');
      }
    });
    this.swapService.getSwapsUpdateListener().subscribe((swaps: Swap[]) => {
      this.swaps = swaps;
    });
    this.listingService
      .getListingsUpdateListener()
      .subscribe((listings: Listing[]) => {
        this.listings = listings;
      });
  }
}
