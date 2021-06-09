import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Listing } from '../../../models/Listing.model';

@Component({
  selector: 'app-listing-create',
  templateUrl: './listing-create.component.html',
  styleUrls: ['./listing-create.component.scss'],
})
export class ListingCreateComponent implements OnInit {
  listing: Listing;
  enteredValue: string = '';
  newListing: Listing;
  @Output() listingCreated = new EventEmitter<Listing>();
  constructor() {}

  ngOnInit(): void {}

  onAddListing = (form: NgForm) => {
    if (form.invalid) {
      return;
    }
    this.newListing = {
      id: '12314515',
      user: '123',
      game: 'abc',
      condition: 'new',
    };
    console.log(form.value);
    // this.listingService.addListing(input);
    form.resetForm();
  };
}
