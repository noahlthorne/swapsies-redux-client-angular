import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthData } from 'src/app/models/User.model';
import { UserService } from 'src/app/services/auth/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  isLoading: boolean = false;

  constructor(private userService: UserService) {}

  ngOnInit(): void {}

  onLogin(form: NgForm) {
    const authData: AuthData = form.value;
    this.userService.loginUser(authData);
    form.reset();
  }
}
