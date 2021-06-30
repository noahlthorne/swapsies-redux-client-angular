import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { Game } from 'src/app/models/Game.model';
import { Listing } from 'src/app/models/Listing.model';
import { User } from 'src/app/models/User.model';
import { UserService } from 'src/app/services/auth/user.service';
import { ListingService } from 'src/app/services/listing/listing.service';
import { trigger, style, animate, transition } from '@angular/animations';

@Component({
  selector: 'app-listing-show',
  templateUrl: './listing-show.component.html',
  styleUrls: ['./listing-show.component.scss'],
  animations: [
    trigger('popOverState', [
      transition(':enter', [
        style({ height: 0, opacity: 0, marginBottom: 0 }),
        animate(
          '0.6s ease-in',
          style({ height: '*', opacity: 1, marginBottom: 45 })
        ),
      ]),
      transition(':leave', [
        style({ height: '*', opacity: 1, marginBottom: 45 }),
        animate(
          '0.8s ease-out',
          style({ height: 0, opacity: 0, marginBottom: 0 })
        ),
      ]),
    ]),
  ],
})
export class ListingShowComponent implements OnInit {
  listing: Listing;
  user: User;
  game: Game;
  isLoading: boolean = false;
  display: boolean = false;
  userIsAuthenticated: boolean = false;

  private listingId: string;

  constructor(
    private listingService: ListingService,
    public route: ActivatedRoute,
    private userService: UserService
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
    this.userIsAuthenticated = this.userService.getAuthStatus();
  }

  toggle() {
    this.display = !this.display;
  }

  get stateName() {
    return this.display ? 'show' : 'hide';
  }
}
