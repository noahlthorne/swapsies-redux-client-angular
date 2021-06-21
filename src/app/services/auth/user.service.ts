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
  private userId: string | null;
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

  getUserId() {
    return this.userId;
  }

  getAuthStatusListener() {
    return this.authStatusListener.asObservable();
  }

  addUser(user: User) {
    this.http.post(this.addUserUrl, user).subscribe(
      () => {
        this.router.navigate(['/']);
      },
      (error) => {
        this.authStatusListener.next(false);
      }
    );
  }

  loginUser(authData: AuthData) {
    this.http
      .post<{
        accessToken: string;
        refreshToken: string;
        expiresIn: number;
        userId: string;
      }>(this.loginUserUrl, authData)
      .subscribe(
        (response) => {
          console.log(response);
          this.authToken = response.accessToken;
          if (this.authToken) {
            const expiresInDuration = response.expiresIn;
            this.setAuthTimeout(expiresInDuration);
            this.isAuthenticated = true;
            this.userId = response.userId;
            this.authStatusListener.next(true);
            const now = new Date();
            const expirationDate = new Date(
              now.getTime() + expiresInDuration * 1000
            );
            this.saveAuthData(this.authToken, expirationDate, this.userId);
            this.router.navigate(['/']);
          }
        },
        (error) => {
          this.authStatusListener.next(false);
        }
      );
  }

  autoAuthUser() {
    let expiresIn;
    const authInformation = this.getAuthData();
    if (!authInformation) return;
    const now = new Date();
    expiresIn = authInformation.expirationDate.getTime() - now.getTime();
    if (expiresIn > 0) {
      this.authToken = authInformation.token;
      this.userId = authInformation.userId;
      this.isAuthenticated = true;
      this.authStatusListener.next(true);
      this.setAuthTimeout(expiresIn / 1000);
    }
  }

  logoutUser() {
    this.authToken = null;
    this.isAuthenticated = false;
    this.authStatusListener.next(false);
    clearTimeout(this.tokenTimer);
    this.clearAuthData();
    this.router.navigate(['/']);
    this.userId = null;
  }

  private setAuthTimeout(duration: number) {
    console.log('Setting timer: ' + duration);
    this.tokenTimer = setTimeout(() => {
      this.logoutUser();
    }, duration * 1000);
  }

  private saveAuthData(
    authToken: string,
    expirationDate: Date,
    userId: string
  ) {
    localStorage.setItem('token', authToken);
    localStorage.setItem('expiration', expirationDate.toISOString());
    localStorage.setItem('userId', userId);
  }

  private clearAuthData() {
    localStorage.removeItem('token');
    localStorage.removeItem('expiration');
    localStorage.removeItem('userId');
  }

  private getAuthData() {
    const token = localStorage.getItem('token');
    const expirationDate = localStorage.getItem('expiration');
    const userId = localStorage.getItem('userid');
    if (!token || !expirationDate) return;
    return {
      token: token,
      expirationDate: new Date(expirationDate),
      userId: userId,
    };
  }
}
