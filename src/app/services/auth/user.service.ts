import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthData, User } from 'src/app/models/User.model';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private addUserUrl: string = 'http://localhost:5000/api/users';
  private loginUserUrl: string = 'http://localhost:5000/api/sessions';

  constructor(private http: HttpClient) {}

  addUser(user: User) {
    this.http.post(this.addUserUrl, user).subscribe((response) => {
      console.log(response);
    });
  }

  loginUser(authData: AuthData) {
    this.http.post(this.loginUserUrl, authData).subscribe((response) => {
      console.log(response);
    });
  }
}
