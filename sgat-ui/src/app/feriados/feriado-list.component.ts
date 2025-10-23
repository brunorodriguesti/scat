import { Component, OnInit } from '@angular/core';
import { Feriado, FeriadoService } from './feriado.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-feriado-list',
  templateUrl: './feriado-list.component.html',
  styleUrls: ['./feriado-list.component.css']
})
export class FeriadoListComponent implements OnInit {
  feriados: Feriado[] = [];

  constructor(private feriadoService: FeriadoService, private router: Router) { }

  ngOnInit(): void {
    this.loadFeriados();
  }

  loadFeriados(): void {
    this.feriadoService.getAllFeriados().subscribe(
      (data) => {
        this.feriados = data;
      },
      (error) => {
        console.error('Erro ao carregar feriados:', error);
      }
    );
  }

  editFeriado(id: number): void {
    this.router.navigate(['/feriados/editar', id]);
  }

  deleteFeriado(id: number): void {
    if (confirm('Tem certeza que deseja excluir este feriado?')) {
      this.feriadoService.deleteFeriado(id).subscribe(
        () => {
          this.loadFeriados(); // Recarrega a lista após a exclusão
        },
        (error) => {
          console.error('Erro ao excluir feriado:', error);
        }
      );
    }
  }

  newFeriado(): void {
    this.router.navigate(['/feriados/novo']);
  }
}
