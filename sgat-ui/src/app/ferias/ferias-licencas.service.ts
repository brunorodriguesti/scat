import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface FeriasLicencas {
  id?: number;
  dataInicio: string; // Representando LocalDate como string (YYYY-MM-DD)
  dataFim: string;     // Representando LocalDate como string (YYYY-MM-DD)
  descricao: string;
  funcionarioId: number;
  funcionarioNome?: string; // Para exibir o nome do funcionário
  horasAfastadas: string; // Representando LocalTime como string (HH:mm:ss)
}

@Injectable({
  providedIn: 'root'
})
export class FeriasLicencasService {
  private apiUrl = 'http://localhost:8081/api/ferias-licencas';

  constructor(private http: HttpClient) { }

  getAllFeriasLicencas(): Observable<FeriasLicencas[]> {
    return this.http.get<FeriasLicencas[]>(this.apiUrl);
  }

  getFeriasLicencasById(id: number): Observable<FeriasLicencas> {
    return this.http.get<FeriasLicencas>(`${this.apiUrl}/${id}`);
  }

  createFeriasLicencas(feriasLicencas: FeriasLicencas): Observable<FeriasLicencas> {
    return this.http.post<FeriasLicencas>(this.apiUrl, feriasLicencas);
  }

  updateFeriasLicencas(id: number, feriasLicencas: FeriasLicencas): Observable<FeriasLicencas> {
    return this.http.put<FeriasLicencas>(`${this.apiUrl}/${id}`, feriasLicencas);
  }

  deleteFeriasLicencas(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
