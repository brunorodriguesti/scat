import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Projeto {
  id?: number;
  nome: string;
  clienteId: number;
  clienteNome?: string; // Para exibir o nome do cliente
}

@Injectable({
  providedIn: 'root'
})
export class ProjetoService {
  private apiUrl = 'http://localhost:8081/api/projetos';

  constructor(private http: HttpClient) { }

  getAllProjetos(): Observable<Projeto[]> {
    return this.http.get<Projeto[]>(this.apiUrl);
  }

  getProjetoById(id: number): Observable<Projeto> {
    return this.http.get<Projeto>(`${this.apiUrl}/${id}`);
  }

  createProjeto(projeto: Projeto): Observable<Projeto> {
    return this.http.post<Projeto>(this.apiUrl, projeto);
  }

  updateProjeto(id: number, projeto: Projeto): Observable<Projeto> {
    return this.http.put<Projeto>(`${this.apiUrl}/${id}`, projeto);
  }

  deleteProjeto(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
