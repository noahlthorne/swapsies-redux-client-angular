import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthData } from 'src/app/models/User.model';
import { UserService } from 'src/app/services/auth/user.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  isLoading: boolean = false;
  private authStatusSub: Subscription;

  constructor(private userService: UserService) {}

  ngOnInit(): void {
    this.authStatusSub = this.userService
      .getAuthStatusListener()
      .subscribe((authStatus) => {
        if (!authStatus) this.isLoading = false;
      });
  }

  onLogin(form: NgForm) {
    if (form.invalid) {
      return;
    }
    this.isLoading = true;
    const authData: AuthData = form.value;
    this.userService.loginUser(authData);
    // form.reset();
  }
}
