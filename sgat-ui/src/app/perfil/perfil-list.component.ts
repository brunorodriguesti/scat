import { Component, OnInit } from '@angular/core';
import { Perfil, PerfilService } from './perfil.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-perfil-list',
  templateUrl: './perfil-list.component.html',
  styleUrls: ['./perfil-list.component.css']
})
export class PerfilListComponent implements OnInit {
  perfis: Perfil[] = [];

  constructor(private perfilService: PerfilService, private router: Router) { }

  ngOnInit(): void {
    this.loadPerfis();
  }

  loadPerfis(): void {
    this.perfilService.getAllPerfis().subscribe(
      (data) => {
        this.perfis = data;
      },
      (error) => {
        console.error('Erro ao carregar perfis:', error);
      }
    );
  }

  editPerfil(id: number): void {
    this.router.navigate(['/perfis/editar', id]);
  }

  deletePerfil(id: number): void {
    if (confirm('Tem certeza que deseja excluir este perfil?')) {
      this.perfilService.deletePerfil(id).subscribe(
        () => {
          this.loadPerfis(); // Recarrega a lista após a exclusão
        },
        (error) => {
          console.error('Erro ao excluir perfil:', error);
        }
      );
    }
  }

  newPerfil(): void {
    this.router.navigate(['/perfis/novo']);
  }
}
