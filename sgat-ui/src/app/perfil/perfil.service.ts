import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Perfil {
  id?: number;
  descricao: string;
  valorHoraPadrao: number;
  horasPadrao: string; // Representando LocalTime como string (HH:mm:ss)
}

@Injectable({
  providedIn: 'root'
})
export class PerfilService {
  private apiUrl = 'http://localhost:8081/api/perfis';

  constructor(private http: HttpClient) { }

  getAllPerfis(): Observable<Perfil[]> {
    return this.http.get<Perfil[]>(this.apiUrl);
  }

  getPerfilById(id: number): Observable<Perfil> {
    return this.http.get<Perfil>(`${this.apiUrl}/${id}`);
  }

  createPerfil(perfil: Perfil): Observable<Perfil> {
    return this.http.post<Perfil>(this.apiUrl, perfil);
  }

  updatePerfil(id: number, perfil: Perfil): Observable<Perfil> {
    return this.http.put<Perfil>(`${this.apiUrl}/${id}`, perfil);
  }

  deletePerfil(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
