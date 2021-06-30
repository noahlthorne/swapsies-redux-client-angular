import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AngularMaterialModule } from 'src/app/angular-material.module';

import { SwapCreateComponent } from './swap-create/swap-create.component';

@NgModule({
  declarations: [SwapCreateComponent],
  imports: [
    CommonModule,
    AngularMaterialModule,
    RouterModule,
    ReactiveFormsModule,
    FormsModule,
  ],
  exports: [SwapCreateComponent],
})
export class SwapsModule {}
