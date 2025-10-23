import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Feriado, FeriadoService } from './feriado.service';

@Component({
  selector: 'app-feriado-form',
  templateUrl: './feriado-form.component.html',
  styleUrls: ['./feriado-form.component.css']
})
export class FeriadoFormComponent implements OnInit {
  feriado: Feriado = { data: '', tipoFeriado: '', territorio: '', descricao: '' };
  isEditMode: boolean = false;

  constructor(
    private feriadoService: FeriadoService,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      const id = params.get('id');
      if (id) {
        this.isEditMode = true;
        this.feriadoService.getFeriadoById(+id).subscribe(
          (data) => {
            this.feriado = data;
          },
          (error) => {
            console.error('Erro ao carregar feriado para edição:', error);
          }
        );
      }
    });
  }

  saveFeriado(): void {
    if (this.isEditMode) {
      this.feriadoService.updateFeriado(this.feriado.id!, this.feriado).subscribe(
        () => {
          this.router.navigate(['/feriados']);
        },
        (error) => {
          console.error('Erro ao atualizar feriado:', error);
        }
      );
    } else {
      this.feriadoService.createFeriado(this.feriado).subscribe(
        () => {
          this.router.navigate(['/feriados']);
        },
        (error) => {
          console.error('Erro ao criar feriado:', error);
        }
      );
    }
  }

  cancel(): void {
    this.router.navigate(['/feriados']);
  }
}
