import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Feriado {
  id?: number;
  data: string; // Representando LocalDate como string (YYYY-MM-DD)
  tipoFeriado: string;
  territorio: string;
  descricao: string;
}

@Injectable({
  providedIn: 'root'
})
export class FeriadoService {
  private apiUrl = 'http://localhost:8081/api/feriados';

  constructor(private http: HttpClient) { }

  getAllFeriados(): Observable<Feriado[]> {
    return this.http.get<Feriado[]>(this.apiUrl);
  }

  getFeriadoById(id: number): Observable<Feriado> {
    return this.http.get<Feriado>(`${this.apiUrl}/${id}`);
  }

  createFeriado(feriado: Feriado): Observable<Feriado> {
    return this.http.post<Feriado>(this.apiUrl, feriado);
  }

  updateFeriado(id: number, feriado: Feriado): Observable<Feriado> {
    return this.http.put<Feriado>(`${this.apiUrl}/${id}`, feriado);
  }

  deleteFeriado(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
