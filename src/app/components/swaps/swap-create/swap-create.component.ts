import { Component, Input, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { Listing } from 'src/app/models/Listing.model';
import { Swap } from 'src/app/models/Swap.model';
import { UserService } from 'src/app/services/auth/user.service';
import { ListingService } from 'src/app/services/listing/listing.service';
import { SocketioService } from 'src/app/services/socketio/socketio.service';
import { SwapService } from 'src/app/services/swap/swap.service';

@Component({
  selector: 'app-swap-create',
  templateUrl: './swap-create.component.html',
  styleUrls: ['./swap-create.component.scss'],
})
export class SwapCreateComponent implements OnInit {
  @Input() listingRequested: Listing;
  currentUsersListings: Listing[] = [];
  currentUserId: string;
  newSwap: Swap;
  swapForm: FormGroup;
  selected: Listing;

  private listingsSub: Subscription;

  constructor(
    private userService: UserService,
    private listingService: ListingService,
    private swapService: SwapService,
    private webSocketService: SocketioService
  ) {}

  ngOnInit(): void {
    this.currentUserId = this.userService.getUserId()!;
    this.listingService.getUserListings(this.currentUserId);
    this.listingsSub = this.listingService
      .getListingsUpdateListener()
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
    this.webSocketService.emit('swap-create', {
      requesterId: this.currentUserId,
      requestedId: this.listingRequested.user._id,
    });
    this.swapService.addSwap(
      this.listingRequested.id,
      this.swapForm.value.listingOffered
    );
  }
}
