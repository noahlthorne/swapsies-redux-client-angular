import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
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
  form: FormGroup;
  imagePreview: string;
  @Output() listingCreated = new EventEmitter<Listing>();
  constructor() {}

  ngOnInit(): void {
    this.form = new FormGroup({
      title: new FormControl('', {
        validators: [Validators.required],
        updateOn: 'submit',
      }),
      image: new FormControl('', {
        validators: [Validators.required],
      }),
    });
  }

  onAddListing = () => {
    if (this.form.invalid) {
      return;
    }
    console.log(this.form.value);
    // this.listingService.addListing(input);
    this.form.reset();
  };

  onImagePicked = (event: Event) => {
    const file = (event.target as HTMLInputElement).files![0];
    this.form.patchValue({ image: file });
    this.form.get('image')?.updateValueAndValidity();
    const reader = new FileReader();
    reader.onload = () => {
      this.imagePreview = reader.result as string;
    };
    reader.readAsDataURL(file);
  };
}
