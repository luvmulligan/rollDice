import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SessionService {
  private apiUrl = 'http://localhost:3000'; // Cambia esto a la URL de tu servidor

  constructor() {}

  // Crear nueva sesión
}
