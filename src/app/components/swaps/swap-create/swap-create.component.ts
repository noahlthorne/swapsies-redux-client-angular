import { Component, Input, OnInit } from '@angular/core';
import { Listing } from 'src/app/models/Listing.model';

@Component({
  selector: 'app-swap-create',
  templateUrl: './swap-create.component.html',
  styleUrls: ['./swap-create.component.scss'],
})
export class SwapCreateComponent implements OnInit {
  @Input() listingRequested: Listing;

  constructor() {}

  ngOnInit(): void {
    console.log('LISTING REQUESTED', this.listingRequested);
  }
}
