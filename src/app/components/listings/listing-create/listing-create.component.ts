import { Component, OnInit, EventEmitter, Output, Input } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { Game } from 'src/app/models/Game.model';
import { ListingService } from 'src/app/services/listing/listing.service';
import { ListingShow, ListingSave } from '../../../models/Listing.model';
import { mimeType } from './mime-type.validator';

@Component({
  selector: 'app-listing-create',
  templateUrl: './listing-create.component.html',
  styleUrls: ['./listing-create.component.scss'],
})
export class ListingCreateComponent implements OnInit {
  @Input() game: Game;
  listing: ListingShow;
  enteredValue: string = '';
  newListing: ListingSave;
  form: FormGroup;
  imagePreview: string;
  selected: string;
  @Output() listingCreated = new EventEmitter<ListingShow>();

  constructor(
    private listingService: ListingService,
    public route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.form = new FormGroup({
      condition: new FormControl('', {
        validators: [Validators.required],
      }),
      image: new FormControl('', {
        validators: [Validators.required],
        asyncValidators: [mimeType],
      }),
    });
  }

  onAddListing = () => {
    if (this.form.invalid) {
      return;
    }
    this.listingService.addListing(
      this.game.id,
      this.form.value.condition,
      this.form.value.image
    );
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
