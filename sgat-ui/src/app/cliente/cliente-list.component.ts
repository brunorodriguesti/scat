import { Component, OnInit } from '@angular/core';
import { Cliente, ClienteService } from './cliente.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cliente-list',
  templateUrl: './cliente-list.component.html',
  styleUrls: ['./cliente-list.component.css']
})
export class ClienteListComponent implements OnInit {
  clientes: Cliente[] = [];

  constructor(private clienteService: ClienteService, private router: Router) { }

  ngOnInit(): void {
    this.loadClientes();
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

  editCliente(id: number): void {
    this.router.navigate(['/clientes/editar', id]);
  }

  deleteCliente(id: number): void {
    if (confirm('Tem certeza que deseja excluir este cliente?')) {
      this.clienteService.deleteCliente(id).subscribe(
        () => {
          this.loadClientes(); // Recarrega a lista após a exclusão
        },
        (error) => {
          console.error('Erro ao excluir cliente:', error);
        }
      );
    }
  }

  newCliente(): void {
    this.router.navigate(['/clientes/novo']);
  }
}
