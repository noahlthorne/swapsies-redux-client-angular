import { Component, Input, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { Listing } from 'src/app/models/Listing.model';
import { UserService } from 'src/app/services/auth/user.service';
import { ListingService } from 'src/app/services/listing/listing.service';

@Component({
  selector: 'app-swap-create',
  templateUrl: './swap-create.component.html',
  styleUrls: ['./swap-create.component.scss'],
})
export class SwapCreateComponent implements OnInit {
  @Input() listingRequested: Listing;
  currentUsersListings: Listing[] = [];
  currentUserId: string;
  swapForm: FormGroup;
  selected: Listing;

  private listingsSub: Subscription;

  constructor(
    private userService: UserService,
    private listingService: ListingService
  ) {}

  ngOnInit(): void {
    this.currentUserId = this.userService.getUserId()!;
    this.listingService.getUserListings(this.currentUserId);
    this.listingsSub = this.listingService
      .getListingUpdateListener()
      .subscribe((listings: Listing[]) => {
        this.currentUsersListings = listings;
      });
    this.swapForm = new FormGroup({
      listingOffered: new FormControl(null, {
        validators: [Validators.required],
      }),
    });
  }

  onAddSwap() {
    if (this.swapForm.invalid) {
      return;
    }
  }
}
