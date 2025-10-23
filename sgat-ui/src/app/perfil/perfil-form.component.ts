import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Perfil, PerfilService } from './perfil.service';

@Component({
  selector: 'app-perfil-form',
  templateUrl: './perfil-form.component.html',
  styleUrls: ['./perfil-form.component.css']
})
export class PerfilFormComponent implements OnInit {
  perfil: Perfil = { descricao: '', valorHoraPadrao: 0, horasPadrao: '00:00:00' };
  isEditMode: boolean = false;

  constructor(
    private perfilService: PerfilService,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      const id = params.get('id');
      if (id) {
        this.isEditMode = true;
        this.perfilService.getPerfilById(+id).subscribe(
          (data) => {
            this.perfil = data;
          },
          (error) => {
            console.error('Erro ao carregar perfil para edição:', error);
          }
        );
      }
    });
  }

  savePerfil(): void {
    if (this.isEditMode) {
      this.perfilService.updatePerfil(this.perfil.id!, this.perfil).subscribe(
        () => {
          this.router.navigate(['/perfis']);
        },
        (error) => {
          console.error('Erro ao atualizar perfil:', error);
        }
      );
    } else {
      this.perfilService.createPerfil(this.perfil).subscribe(
        () => {
          this.router.navigate(['/perfis']);
        },
        (error) => {
          console.error('Erro ao criar perfil:', error);
        }
      );
    }
  }

  cancel(): void {
    this.router.navigate(['/perfis']);
  }
}
