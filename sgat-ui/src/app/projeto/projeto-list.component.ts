import { Component, OnInit } from '@angular/core';
import { Projeto, ProjetoService } from './projeto.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-projeto-list',
  templateUrl: './projeto-list.component.html',
  styleUrls: ['./projeto-list.component.css']
})
export class ProjetoListComponent implements OnInit {
  projetos: Projeto[] = [];

  constructor(private projetoService: ProjetoService, private router: Router) { }

  ngOnInit(): void {
    this.loadProjetos();
  }

  loadProjetos(): void {
    this.projetoService.getAllProjetos().subscribe(
      (data) => {
        this.projetos = data;
      },
      (error) => {
        console.error('Erro ao carregar projetos:', error);
      }
    );
  }

  editProjeto(id: number): void {
    this.router.navigate(['/projetos/editar', id]);
  }

  deleteProjeto(id: number): void {
    if (confirm('Tem certeza que deseja excluir este projeto?')) {
      this.projetoService.deleteProjeto(id).subscribe(
        () => {
          this.loadProjetos(); // Recarrega a lista após a exclusão
        },
        (error) => {
          console.error('Erro ao excluir projeto:', error);
        }
      );
    }
  }

  newProjeto(): void {
    this.router.navigate(['/projetos/novo']);
  }
}
