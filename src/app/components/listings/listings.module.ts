import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AngularMaterialModule } from 'src/app/angular-material.module';

import { ListingsContainerComponent } from './listings-container/listings-container.component';
import { ListingsListComponent } from './listings-list/listings-list.component';
import { ListingCardComponent } from './listing-card/listing-card.component';
import { ListingCreateComponent } from './listing-create/listing-create.component';
import { ListingShowComponent } from './listing-show/listing-show.component';
import { SwapsModule } from '../swaps/swaps.module';

@NgModule({
  declarations: [
    ListingsContainerComponent,
    ListingsListComponent,
    ListingCardComponent,
    ListingCreateComponent,
    ListingShowComponent,
  ],
  imports: [
    CommonModule,
    AngularMaterialModule,
    RouterModule,
    ReactiveFormsModule,
    FormsModule,
    SwapsModule,
  ],
  exports: [ListingsContainerComponent, ListingCreateComponent],
})
export class ListingsModule {}
