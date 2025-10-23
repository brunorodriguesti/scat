import { Component, OnInit } from '@angular/core';
import { FeriasLicencas, FeriasLicencasService } from './ferias-licencas.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-ferias-licencas-list',
  templateUrl: './ferias-licencas-list.component.html',
  styleUrls: ['./ferias-licencas-list.component.css']
})
export class FeriasLicencasListComponent implements OnInit {
  feriasLicencas: FeriasLicencas[] = [];

  constructor(private feriasLicencasService: FeriasLicencasService, private router: Router) { }

  ngOnInit(): void {
    this.loadFeriasLicencas();
  }

  loadFeriasLicencas(): void {
    this.feriasLicencasService.getAllFeriasLicencas().subscribe(
      (data) => {
        this.feriasLicencas = data;
      },
      (error) => {
        console.error('Erro ao carregar férias/licenças:', error);
      }
    );
  }

  editFeriasLicencas(id: number): void {
    this.router.navigate(['/ferias-licencas/editar', id]);
  }

  deleteFeriasLicencas(id: number): void {
    if (confirm('Tem certeza que deseja excluir esta férias/licença?')) {
      this.feriasLicencasService.deleteFeriasLicencas(id).subscribe(
        () => {
          this.loadFeriasLicencas(); // Recarrega a lista após a exclusão
        },
        (error) => {
          console.error('Erro ao excluir férias/licença:', error);
        }
      );
    }
  }

  newFeriasLicencas(): void {
    this.router.navigate(['/ferias-licencas/novo']);
  }
}
