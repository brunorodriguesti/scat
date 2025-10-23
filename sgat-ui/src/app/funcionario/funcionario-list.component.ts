import { Component, OnInit } from '@angular/core';
import { Funcionario, FuncionarioService } from './funcionario.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-funcionario-list',
  templateUrl: './funcionario-list.component.html',
  styleUrls: ['./funcionario-list.component.css']
})
export class FuncionarioListComponent implements OnInit {
  funcionarios: Funcionario[] = [];

  constructor(private funcionarioService: FuncionarioService, private router: Router) { }

  ngOnInit(): void {
    this.loadFuncionarios();
  }

  loadFuncionarios(): void {
    this.funcionarioService.getAllFuncionarios().subscribe(
      (data) => {
        this.funcionarios = data;
      },
      (error) => {
        console.error('Erro ao carregar funcionários:', error);
      }
    );
  }

  editFuncionario(id: number): void {
    this.router.navigate(['/funcionarios/editar', id]);
  }

  deleteFuncionario(id: number): void {
    if (confirm('Tem certeza que deseja excluir este funcionário?')) {
      this.funcionarioService.deleteFuncionario(id).subscribe(
        () => {
          this.loadFuncionarios(); // Recarrega a lista após a exclusão
        },
        (error) => {
          console.error('Erro ao excluir funcionário:', error);
        }
      );
    }
  }

  newFuncionario(): void {
    this.router.navigate(['/funcionarios/novo']);
  }
}
