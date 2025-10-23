import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Cliente, ClienteService } from './cliente.service';

@Component({
  selector: 'app-cliente-form',
  templateUrl: './cliente-form.component.html',
  styleUrls: ['./cliente-form.component.css']
})
export class ClienteFormComponent implements OnInit {
  cliente: Cliente = { nome: '' };
  isEditMode: boolean = false;

  constructor(
    private clienteService: ClienteService,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      const id = params.get('id');
      if (id) {
        this.isEditMode = true;
        this.clienteService.getClienteById(+id).subscribe(
          (data) => {
            this.cliente = data;
          },
          (error) => {
            console.error('Erro ao carregar cliente para edição:', error);
          }
        );
      }
    });
  }

  saveCliente(): void {
    if (this.isEditMode) {
      this.clienteService.updateCliente(this.cliente.id!, this.cliente).subscribe(
        () => {
          this.router.navigate(['/clientes']);
        },
        (error) => {
          console.error('Erro ao atualizar cliente:', error);
        }
      );
    } else {
      this.clienteService.createCliente(this.cliente).subscribe(
        () => {
          this.router.navigate(['/clientes']);
        },
        (error) => {
          console.error('Erro ao criar cliente:', error);
        }
      );
    }
  }

  cancel(): void {
    this.router.navigate(['/clientes']);
  }
}
