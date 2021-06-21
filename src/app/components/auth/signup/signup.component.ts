import { Component, OnDestroy, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';
import { User } from 'src/app/models/User.model';
import { UserService } from 'src/app/services/auth/user.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss'],
})
export class SignupComponent implements OnInit, OnDestroy {
  isLoading: boolean = false;
  private authStatusSub: Subscription;
  constructor(
    private userService: UserService,
    private _snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.authStatusSub = this.userService
      .getAuthStatusListener()
      .subscribe((authStatus) => {
        if (!authStatus) {
          this.isLoading = false;
          this.openSnackBar('Invalid email or password');
        }
      });
  }

  onSignup(form: NgForm) {
    if (form.invalid) {
      return;
    }
    this.isLoading = true;
    const user: User = form.value;
    this.userService.addUser(user);
    form.reset();
  }

  openSnackBar(message: string) {
    this._snackBar.open(message, 'dismiss', {
      panelClass: ['grey-snackbar'],
    });
  }

  ngOnDestroy() {
    this.authStatusSub.unsubscribe();
  }
}
