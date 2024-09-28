import { Component } from '@angular/core';
import { SessionService } from '../session.service';
import { WebsocketService } from '../websocket.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-session',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './session.component.html',
  styleUrl: './session.component.scss'
})
export class SessionComponent {
  sessionId: string = '';
  playerReady: boolean = false;
  modalAbierto: boolean = false;
  playerName: string = '';
  players: any[] = [];
  isReady: boolean = false;

  constructor(private websocketService: WebsocketService) {
    this.websocketService.onSessionUpdate().subscribe((users) => {
      this.players = users;
      console.log(users);
    });
  }

  // Método para crear una nueva sesión
  createNewSession() {
    this.websocketService.createSession().subscribe((response) => {
      this.sessionId = response.sessionId; // Guardar el ID de la sesión
      console.log('Nueva sesión creada con ID:', this.sessionId);
      this.joinSession();
    });
  }
  startGame() {
    this.playerReady = true;
    // this.websocketService.ready(this.sessionId);
  }
  markAsReady() {
    this.isReady = !this.isReady;
    this.websocketService.ready(this.sessionId, this.isReady);
  }
  abrirModal(event: Event) {
    event.preventDefault(); // Evita que el enlace recargue la página
    this.modalAbierto = true;
  }

  cerrarModal() {
    this.modalAbierto = false;
  }
  unirseASesion() {
    this.joinSession();

    if (this.sessionId.trim()) {
      console.log('Unirse a la sesión con ID:', this.sessionId);
      // Lógica para unirse a la sesión con el ID proporcionado
      this.cerrarModal();
    }
  }
  joinSession() {
    if (this.sessionId) {
      this.websocketService.joinSession(this.sessionId, this.playerName);
    } else {
      // this.errorMessage = 'Debes ingresar un ID de sesión y un nombre de usuario';
    }
  }
  updateName() {
    this.websocketService.updateName(this.sessionId, this.playerName);
  }
}
