import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { UserService } from 'src/app/services/auth/user.service';
import { environment } from '../../../environments/environment';
import { SocketioService } from 'src/app/services/socketio/socketio.service';

const SERVER_URL = environment.serverUrl;

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit, OnDestroy {
  userIsAuthenticated: boolean = false;
  userId: string = '';
  private authListenerSub: Subscription;

  constructor(
    private userService: UserService,
    private webSocketService: SocketioService
  ) {}

  ngOnInit(): void {
    this.userIsAuthenticated = this.userService.getAuthStatus();
    console.log(this.userIsAuthenticated);
    if (this.userIsAuthenticated) {
      this.userId = this.userService.getUserId()!;
      this.webSocketService.emit('connect-user', this.userId);
      this.webSocketService.listen('swap-notification').subscribe((data) => {
        console.log('DATA', data);
      });
    }
    this.authListenerSub = this.userService
      .getAuthStatusListener()
      .subscribe((isAuthenticated) => {
        this.userIsAuthenticated = isAuthenticated;
      });
  }

  ngOnDestroy() {
    this.authListenerSub.unsubscribe();
  }

  onLogout() {
    this.userService.logoutUser();
  }
}
