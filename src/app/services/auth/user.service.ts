import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from 'src/app/models/User.model';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private usersUrl: string = 'http://localhost:5000/api/users';

  constructor(private http: HttpClient) {}

  addUser(user: User) {
    this.http.post(this.usersUrl, user).subscribe((response) => {
      console.log(response);
    });
  }
}
