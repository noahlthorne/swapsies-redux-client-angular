import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Listing } from '../../models/Listing.model';

@Component({
  selector: 'app-listing-create',
  templateUrl: './listing-create.component.html',
  styleUrls: ['./listing-create.component.scss'],
})
export class ListingCreateComponent implements OnInit {
  enteredValue: string = '';
  newListing: Listing;
  @Output() listingCreated = new EventEmitter<Listing>();
  constructor() {}

  ngOnInit(): void {}

  onAddListing = (form: NgForm) => {
    console.log(form);
    this.newListing = {
      user: '123',
      game: 'abc',
      condition: 'new',
    };
    this.listingCreated.emit(this.newListing);
  };
}
