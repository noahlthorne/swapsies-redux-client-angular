import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { AuthData, User } from 'src/app/models/User.model';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private isAuthenticated = false;
  private authToken: string | null;
  private tokenTimer: NodeJS.Timer;
  private authStatusListener = new Subject<boolean>();

  private addUserUrl: string = 'http://localhost:5000/api/users';
  private loginUserUrl: string = 'http://localhost:5000/api/sessions';

  constructor(private http: HttpClient, private router: Router) {}

  getAuthToken() {
    return this.authToken;
  }

  getAuthStatus() {
    return this.isAuthenticated;
  }

  getAuthStatusListener() {
    return this.authStatusListener.asObservable();
  }

  addUser(user: User) {
    this.http.post(this.addUserUrl, user).subscribe((response) => {
      console.log(response);
    });
  }

  loginUser(authData: AuthData) {
    this.http
      .post<{ accessToken: string; refreshToken: string; expiresIn: number }>(
        this.loginUserUrl,
        authData
      )
      .subscribe((response) => {
        console.log(response);
        this.authToken = response.accessToken;
        if (this.authToken) {
          const expiresInDuration = response.expiresIn;
          this.tokenTimer = setTimeout(() => {
            this.logoutUser();
          }, expiresInDuration * 1000);
          this.isAuthenticated = true;
          this.authStatusListener.next(true);
          this.router.navigate(['/']);
        }
      });
  }

  logoutUser() {
    this.authToken = null;
    this.isAuthenticated = false;
    this.authStatusListener.next(false);
    this.router.navigate(['/']);
    clearTimeout(this.tokenTimer);
  }
}
