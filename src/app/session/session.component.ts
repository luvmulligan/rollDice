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

  constructor(private websocketService: WebsocketService) {}

  // Método para crear una nueva sesión
  createNewSession() {
    this.websocketService.createSession().subscribe((response) => {
      this.sessionId = response.sessionId; // Guardar el ID de la sesión
      console.log('Nueva sesión creada con ID:', this.sessionId);
    });
  }
  startGame() {
    this.playerReady = true;
  }
  abrirModal(event: Event) {
    event.preventDefault(); // Evita que el enlace recargue la página
    this.modalAbierto = true;
  }

  cerrarModal() {
    this.modalAbierto = false;
  }
  unirseASesion() {
    if (this.sessionId.trim()) {
      console.log('Unirse a la sesión con ID:', this.sessionId);
      // Lógica para unirse a la sesión con el ID proporcionado
      this.cerrarModal();
    }
  }
}
