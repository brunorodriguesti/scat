import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface HorasTrabalhadas {
  id?: number;
  dataTrabalho: string; // Representando LocalDate como string (YYYY-MM-DD)
  horasTrabalhadas: string; // Representando LocalTime como string (HH:mm:ss)
  funcionarioId: number;
  funcionarioNome?: string; // Para exibir o nome do funcionário
  valor: number;
}

@Injectable({
  providedIn: 'root'
})
export class HorasTrabalhadasService {
  private apiUrl = 'http://localhost:8081/api/horas-trabalhadas';

  constructor(private http: HttpClient) { }

  getAllHorasTrabalhadas(): Observable<HorasTrabalhadas[]> {
    return this.http.get<HorasTrabalhadas[]>(this.apiUrl);
  }

  getHorasTrabalhadasById(id: number): Observable<HorasTrabalhadas> {
    return this.http.get<HorasTrabalhadas>(`${this.apiUrl}/${id}`);
  }

  createHorasTrabalhadas(horasTrabalhadas: HorasTrabalhadas): Observable<HorasTrabalhadas> {
    return this.http.post<HorasTrabalhadas>(this.apiUrl, horasTrabalhadas);
  }

  updateHorasTrabalhadas(id: number, horasTrabalhadas: HorasTrabalhadas): Observable<HorasTrabalhadas> {
    return this.http.put<HorasTrabalhadas>(`${this.apiUrl}/${id}`, horasTrabalhadas);
  }

  deleteHorasTrabalhadas(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
