import { Component, OnInit } from '@angular/core';
import { UserService } from './services/auth/user.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  title = 'swapsies-redux-client';

  constructor(private userService: UserService) {}

  ngOnInit() {
    this.userService.autoAuthUser();
  }
}
