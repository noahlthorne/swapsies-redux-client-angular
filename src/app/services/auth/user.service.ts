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
          const now = new Date();
          const expirationDate = new Date(
            now.getTime() + expiresInDuration * 1000
          );
          this.saveAuthData(this.authToken, expirationDate);
          this.router.navigate(['/']);
        }
      });
  }

  logoutUser() {
    this.authToken = null;
    this.isAuthenticated = false;
    this.authStatusListener.next(false);
    clearTimeout(this.tokenTimer);
    this.clearAuthData();
    this.router.navigate(['/']);
  }

  private saveAuthData(authToken: string, expirationDate: Date) {
    localStorage.setItem('token', authToken);
    localStorage.setItem('expiration', expirationDate.toISOString());
  }

  private clearAuthData() {
    localStorage.removeItem('token');
    localStorage.removeItem('expiration');
  }
}
