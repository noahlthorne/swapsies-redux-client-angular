import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AngularMaterialModule } from 'src/app/angular-material.module';

import { SwapCreateComponent } from './swap-create/swap-create.component';
import { SwapCardComponent } from './swap-card/swap-card.component';

@NgModule({
  declarations: [SwapCreateComponent, SwapCardComponent],
  imports: [
    CommonModule,
    AngularMaterialModule,
    RouterModule,
    ReactiveFormsModule,
    FormsModule,
  ],
  exports: [SwapCreateComponent, SwapCardComponent],
})
export class SwapsModule {}
