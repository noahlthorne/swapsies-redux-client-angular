import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { UserService } from 'src/app/services/auth/user.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss'],
})
export class SignupComponent implements OnInit {
  isLoading: boolean = false;
  constructor(private userService: UserService) {}

  ngOnInit(): void {}

  onSignup(form: NgForm) {
    this.userService.addUser(form.value);
    form.reset();
  }
}
