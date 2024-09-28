import { Injectable } from '@angular/core';
import { io, Socket } from 'socket.io-client';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

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
  // emit(eventName: string, data?: any) {
  //   this.socket.emit(eventName, data);
  // }

  // // Escuchar eventos
  // listen(eventName: string): Observable<any> {
  //   return new Observable((subscriber) => {
  //     this.socket.on(eventName, (data) => {
  //       subscriber.next(data);
  //     });
  //   });
  // }

  // Crear una nueva sesión mediante WebSocket
  createSession(): Observable<{ sessionId: string }> {
    return new Observable((observer) => {
      this.socket.emit('createSession');
      this.socket.on('sessionCreated', (response) => {
        observer.next(response); // Emitir el ID de la sesión creada
      });
    });
  }
  // Unirse a una sesión
  joinSession(sessionId: string, name: string) {
    this.socket.emit('joinSession', { sessionId, name });
  }

  // Actualizar nombre
  updateName(sessionId: string, newName: string) {
    this.socket.emit('updateName', { sessionId, newName });
  }
  // Marcar que el usuario está listo
  ready(sessionId: string, isReady: boolean) {
    this.socket.emit('ready', { sessionId, isReady });
  }

  // Escuchar actualizaciones de la sesión
  onSessionUpdate(): Observable<any> {
    return new Observable((observer) => {
      this.socket.on('sessionUpdate', (users) => {
        observer.next(users);
      });
    });
  }

  // Manejo de errores
  onError(): Observable<string> {
    return new Observable((observer) => {
      this.socket.on('error', (errorMessage) => {
        observer.next(errorMessage);
      });
    });
  }
}
