import { Component, OnInit } from '@angular/core';

interface Cliente {
  id: number;
  nome: string;
}

interface Projeto {
  id: number;
  nome: string;
  cliente: Cliente | null;
}

@Component({
  selector: 'app-projeto',
  templateUrl: './projeto.component.html',
  styleUrls: ['./projeto.component.css']
})
export class ProjetoComponent implements OnInit {
  nomeProjeto: string = '';
  clienteSelecionado: Cliente | null = null;
  clientes: Cliente[] = []; // This would come from a service in a real app
  projetos: Projeto[] = [];
  nextId: number = 1;

  ngOnInit() {
    // Dummy data for clients
    this.clientes = [
      { id: 1, nome: 'Cliente A' },
      { id: 2, nome: 'Cliente B' },
      { id: 3, nome: 'Cliente C' },
    ];
  }

  salvarProjeto() {
    if (this.nomeProjeto.trim()) {
      const newProjeto: Projeto = {
        id: this.nextId++,
        nome: this.nomeProjeto.trim(),
        cliente: this.clienteSelecionado
      };
      this.projetos.push(newProjeto);
      console.log('Projeto salvo:', newProjeto);
      this.nomeProjeto = ''; // Clear the input after saving
      this.clienteSelecionado = null;
    }
  }

  pesquisarProjeto() {
    console.log('Pesquisar projeto com nome:', this.nomeProjeto, 'e cliente:', this.clienteSelecionado);
    // Implement actual search logic here
  }

  listarProjetos() {
    console.log('Listando todos os projetos:', this.projetos);
    // Implement actual list fetching logic here
  }

  editarProjeto(projeto: Projeto) {
    console.log('Editar projeto:', projeto);
    // Implement actual edit logic here
    this.nomeProjeto = projeto.nome;
    this.clienteSelecionado = projeto.cliente;
    this.projetos = this.projetos.filter(p => p.id !== projeto.id);
  }

  excluirProjeto(projeto: Projeto) {
    console.log('Excluir projeto:', projeto);
    this.projetos = this.projetos.filter(p => p.id !== projeto.id);
    // Implement actual delete logic here
  }
}