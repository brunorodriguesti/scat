import { Component, OnInit } from '@angular/core';
import { HorasTrabalhadas, HorasTrabalhadasService } from './horas-trabalhadas.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-horas-trabalhadas-list',
  templateUrl: './horas-trabalhadas-list.component.html',
  styleUrls: ['./horas-trabalhadas-list.component.css']
})
export class HorasTrabalhadasListComponent implements OnInit {
  horasTrabalhadas: HorasTrabalhadas[] = [];

  constructor(private horasTrabalhadasService: HorasTrabalhadasService, private router: Router) { }

  ngOnInit(): void {
    this.loadHorasTrabalhadas();
  }

  loadHorasTrabalhadas(): void {
    this.horasTrabalhadasService.getAllHorasTrabalhadas().subscribe(
      (data) => {
        this.horasTrabalhadas = data;
      },
      (error) => {
        console.error('Erro ao carregar horas trabalhadas:', error);
      }
    );
  }

  editHorasTrabalhadas(id: number): void {
    this.router.navigate(['/horas-trabalhadas/editar', id]);
  }

  deleteHorasTrabalhadas(id: number): void {
    if (confirm('Tem certeza que deseja excluir estas horas trabalhadas?')) {
      this.horasTrabalhadasService.deleteHorasTrabalhadas(id).subscribe(
        () => {
          this.loadHorasTrabalhadas(); // Recarrega a lista após a exclusão
        },
        (error) => {
          console.error('Erro ao excluir horas trabalhadas:', error);
        }
      );
    }
  }

  newHorasTrabalhadas(): void {
    this.router.navigate(['/horas-trabalhadas/novo']);
  }
}
