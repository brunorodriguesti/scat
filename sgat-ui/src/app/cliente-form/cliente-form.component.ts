import { Component } from '@angular/core';

interface Cliente {
  id: number;
  nome: string;
}

@Component({
  selector: 'app-cliente-form',
  templateUrl: './cliente-form.component.html',
  styleUrls: ['./cliente-form.component.css']
})
export class ClienteFormComponent {
  nomeCliente: string = '';
  clientes: Cliente[] = [];
  nextId: number = 1;

  salvarCliente() {
    if (this.nomeCliente.trim()) {
      const newCliente: Cliente = { id: this.nextId++, nome: this.nomeCliente.trim() };
      this.clientes.push(newCliente);
      console.log('Cliente salvo:', newCliente);
      this.nomeCliente = ''; // Clear the input after saving
    }
  }

  pesquisarCliente() {
    console.log('Pesquisar cliente com nome:', this.nomeCliente);
    // Implement actual search logic here
  }

  listarClientes() {
    console.log('Listando todos os clientes:', this.clientes);
    // Implement actual list fetching logic here
  }

  editarCliente(cliente: Cliente) {
    console.log('Editar cliente:', cliente);
    // Implement actual edit logic here
    this.nomeCliente = cliente.nome; // Populate form for editing
    this.clientes = this.clientes.filter(c => c.id !== cliente.id); // Remove from list for re-adding
  }

  excluirCliente(cliente: Cliente) {
    console.log('Excluir cliente:', cliente);
    this.clientes = this.clientes.filter(c => c.id !== cliente.id);
    // Implement actual delete logic here
  }
}