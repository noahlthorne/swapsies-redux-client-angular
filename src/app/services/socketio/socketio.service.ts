import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Socket, io } from 'socket.io-client';
import { environment } from '../../../environments/environment';

const SERVER_URL = environment.serverUrl;

@Injectable({
  providedIn: 'root',
})
export class SocketioService {
  socket: Socket;

  constructor() {
    this.socket = io(SERVER_URL);
  }

  listen(eventName: string) {
    return new Observable((subscriber) => {
      this.socket.on(eventName, (data) => {
        subscriber.next(data);
      });
    });
  }

  emit(eventName: string, data: any) {
    this.socket.emit(eventName, data);
  }
}
