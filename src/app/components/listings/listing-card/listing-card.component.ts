import { Component, Input, OnInit } from '@angular/core';
import { ListingShow } from 'src/app/models/Listing.model';

@Component({
  selector: 'app-listing-card',
  templateUrl: './listing-card.component.html',
  styleUrls: ['./listing-card.component.scss'],
})
export class ListingCardComponent implements OnInit {
  @Input() listing: ListingShow;
  constructor() {}

  ngOnInit(): void {}
}
