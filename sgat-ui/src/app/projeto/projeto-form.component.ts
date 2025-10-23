import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Projeto, ProjetoService } from './projeto.service';
import { Cliente, ClienteService } from '../cliente/cliente.service'; // Importar ClienteService

@Component({
  selector: 'app-projeto-form',
  templateUrl: './projeto-form.component.html',
  styleUrls: ['./projeto-form.component.css']
})
export class ProjetoFormComponent implements OnInit {
  projeto: Projeto = { nome: '', clienteId: 0 };
  clientes: Cliente[] = []; // Lista de clientes para o dropdown
  isEditMode: boolean = false;

  constructor(
    private projetoService: ProjetoService,
    private clienteService: ClienteService, // Injetar ClienteService
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.loadClientes(); // Carregar clientes ao inicializar o componente

    this.route.paramMap.subscribe(params => {
      const id = params.get('id');
      if (id) {
        this.isEditMode = true;
        this.projetoService.getProjetoById(+id).subscribe(
          (data) => {
            this.projeto = data;
          },
          (error) => {
            console.error('Erro ao carregar projeto para edição:', error);
          }
        );
      }
    });
  }

  loadClientes(): void {
    this.clienteService.getAllClientes().subscribe(
      (data) => {
        this.clientes = data;
      },
      (error) => {
        console.error('Erro ao carregar clientes:', error);
      }
    );
  }

  saveProjeto(): void {
    if (this.isEditMode) {
      this.projetoService.updateProjeto(this.projeto.id!, this.projeto).subscribe(
        () => {
          this.router.navigate(['/projetos']);
        },
        (error) => {
          console.error('Erro ao atualizar projeto:', error);
        }
      );
    } else {
      this.projetoService.createProjeto(this.projeto).subscribe(
        () => {
          this.router.navigate(['/projetos']);
        },
        (error) => {
          console.error('Erro ao criar projeto:', error);
        }
      );
    }
  }

  cancel(): void {
    this.router.navigate(['/projetos']);
  }
}
