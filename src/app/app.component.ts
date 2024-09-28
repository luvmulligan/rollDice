import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { WebsocketService } from './websocket.service';
import { CommonModule, JsonPipe } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SessionComponent } from './session/session.component';

export interface Player {
  id: string;
  result: number;
  score: number;
  turnDices: any[];
  canRoll: boolean;
  canParenMaren: boolean;
}
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, CommonModule, FormsModule, SessionComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit {
  title = 'rollDice';
  players: Player[] = [];
  currentPlayerId!: string;
  myId!: string;
  myTurn: boolean = false;
  diceResult!: number;
  myScore: number = 0;
  canRoll: boolean = true;
  canParenMaren: boolean = false;
  blackDiceRolled: boolean = false;
  diceAudio!: any;
  blackDice = 1;
  winner!: any;
  turnDices: any[] = [];
  currentPlayer!: any;
  //
  sessionId: string = '';
  userName: string = '';
  users: any[] = [];
  errorMessage: string = '';
  createSession: boolean = false;

  constructor(private webSocketService: WebsocketService) {}

  ngOnInit(): void {
    // this.webSocketService.onSessionUpdate().subscribe((users) => {
    //   this.users = users;
    //   console.log(this.users);
    // });

    // Escuchar errores
    this.webSocketService.onError().subscribe((error) => {
      this.errorMessage = error;
    });
    // Asignar ID del socket como el ID del jugador
    // this.webSocketService.listen('connect').subscribe(() => {
    //   this.myId = this.webSocketService['socket'].id!;
    // });
    // // Escuchar si no es el turno del jugador
    // this.webSocketService.listen('notYourTurn').subscribe((message) => {
    //   alert(message);
    // });
    // this.webSocketService.listen('gameStart').subscribe((data) => {
    //   this.currentPlayerId = data;
    // });
    // Escuchar la lista de jugadores
    // this.webSocketService.listen('playersUpdate').subscribe((players) => {
    //   this.players = players;
    //   this.currentPlayer = this.players.find((player) => {
    //     player.id === this.myId;
    //   });
    //   this.players.forEach((player) => {
    //     if (!player.canRoll) {
    //       // player.turnDices = [];
    //     }
    //   });
    // });
    // Escuchar el resultado del dado
    // this.webSocketService.listen('diceResult').subscribe((data) => {
    //   if (data.playerId === this.myId) {
    //     this.myScore = data.score;
    //   }
    //   this.diceResult = data.result;
    //   // this.turnDices = data.turnDices;
    // });
    // // Escuchar cambios de turno
    // this.webSocketService.listen('turnUpdate').subscribe((currentPlayerId) => {
    //   this.currentPlayerId = currentPlayerId;
    //   this.myTurn = this.currentPlayerId === this.myId;
    // });
  }
  // Unirse a una sesión
  // joinSession() {
  //   if (this.sessionId && this.userName) {
  //     this.webSocketService.joinSession(this.sessionId, this.userName);
  //   } else {
  //     this.errorMessage = 'Debes ingresar un ID de sesión y un nombre de usuario';
  //   }
  // }

  // Actualizar nombre
  // updateName(newName: string) {
  //   this.webSocketService.updateName(this.sessionId, newName);
  // }

  // Marcar que estás listo
  // markAsReady() {
  //   this.webSocketService.ready(this.sessionId);
  // }
  // Función para lanzar los dados
  // rollDice() {
  //   if (this.myTurn) {
  //     this.webSocketService.emit('rollDice');
  //   }
  // }
}
