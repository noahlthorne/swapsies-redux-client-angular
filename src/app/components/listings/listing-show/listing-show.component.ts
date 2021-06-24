import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { Game } from 'src/app/models/Game.model';
import { Listing } from 'src/app/models/Listing.model';
import { User } from 'src/app/models/User.model';
import { ListingService } from 'src/app/services/listing/listing.service';

@Component({
  selector: 'app-listing-show',
  templateUrl: './listing-show.component.html',
  styleUrls: ['./listing-show.component.scss'],
})
export class ListingShowComponent implements OnInit {
  listing: Listing;
  user: User;
  game: Game;
  isLoading: boolean = false;

  private listingId: string;

  constructor(
    private listingService: ListingService,
    public route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.isLoading = true;
    this.route.paramMap.subscribe((paramMap: ParamMap) => {
      if (paramMap.has('listingId')) {
        this.listingId = paramMap.get('listingId')!;
        this.listingService.getListing(this.listingId).subscribe(
          (listing) => {
            this.isLoading = false;
            this.listing = listing;
            this.user = listing.user;
            this.game = listing.game;
          },
          () => {
            this.isLoading = false;
          }
        );
      }
    });
  }
}
