import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { WebsocketService } from './websocket.service';
import { CommonModule, JsonPipe } from '@angular/common';
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
  imports: [RouterOutlet, CommonModule],
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
  turnDices = [];
  currentPlayer!: any;
  constructor(private webSocketService: WebsocketService) {}

  ngOnInit(): void {
    this.webSocketService.listen('gameStart').subscribe((data) => {});
    // Escuchar la lista de jugadores

    this.webSocketService.listen('playersUpdate').subscribe((players) => {
      this.players = players;
      this.players.forEach((player) => {
        if (!player.canRoll) {
          // player.turnDices = [];
        }
      });
    });

    // Escuchar el resultado del dado
    this.webSocketService.listen('diceResult').subscribe((data) => {
      if (data.playerId === this.myId) {
        this.myScore = data.score;
      }
      this.diceResult = data.result;
    });

    // Escuchar cambios de turno
    this.webSocketService.listen('turnUpdate').subscribe((currentPlayerId) => {
      this.currentPlayerId = currentPlayerId;
      this.myTurn = this.currentPlayerId === this.myId;
      this.players.forEach((player) => {
        if (player.id === this.currentPlayerId) {
          this.currentPlayer = player;
          console.log(this.currentPlayer);
        }
      });
      // this.currentPlayer = this.players.find((player) => player.id === this.currentPlayerId);
      console.log(this.currentPlayer);
    });

    // Asignar ID del socket como el ID del jugador
    this.webSocketService.listen('connect').subscribe(() => {
      this.myId = this.webSocketService['socket'].id!;
    });

    // Escuchar si no es el turno del jugador
    this.webSocketService.listen('notYourTurn').subscribe((message) => {
      alert(message);
    });
  }

  // Función para lanzar los dados
  rollDice() {
    if (this.myTurn) {
      this.webSocketService.emit('rollDice');
    }
  }
}
