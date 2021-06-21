import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AngularMaterialModule } from 'src/app/angular-material.module';

import { SignupComponent } from './signup/signup.component';
import { LoginComponent } from './login/login.component';

@NgModule({
  declarations: [SignupComponent, LoginComponent],
  imports: [
    CommonModule,
    AngularMaterialModule,
    RouterModule,
    ReactiveFormsModule,
    FormsModule,
  ],
  exports: [],
})
export class AuthModule {}
