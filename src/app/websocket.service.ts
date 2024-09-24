import { Injectable } from '@angular/core';
import { io, Socket } from 'socket.io-client';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class WebsocketService {
  private socket: Socket;
  constructor() {
    this.socket = io('http://localhost:3000'); // URL del servidor WebSocket
  }

  // Método para escuchar eventos

  // Emitir eventos
  emit(eventName: string, data?: any) {
    this.socket.emit(eventName, data);
  }

  // Escuchar eventos
  listen(eventName: string): Observable<any> {
    return new Observable((subscriber) => {
      this.socket.on(eventName, (data) => {
        subscriber.next(data);
      });
    });
  }
}
