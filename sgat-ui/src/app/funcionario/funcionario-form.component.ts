import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Funcionario, FuncionarioService } from './funcionario.service';
import { Projeto, ProjetoService } from '../projeto/projeto.service';
import { Perfil, PerfilService } from '../perfil/perfil.service';

@Component({
  selector: 'app-funcionario-form',
  templateUrl: './funcionario-form.component.html',
  styleUrls: ['./funcionario-form.component.css']
})
export class FuncionarioFormComponent implements OnInit {
  funcionario: Funcionario = {
    cpf: '',
    matricula: '',
    nome: '',
    projetoId: 0,
    perfilId: 0,
    valorHora: 0,
    tipoContrato: '',
    territorioSindicato: ''
  };
  projetos: Projeto[] = [];
  perfis: Perfil[] = [];
  isEditMode: boolean = false;

  constructor(
    private funcionarioService: FuncionarioService,
    private projetoService: ProjetoService,
    private perfilService: PerfilService,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.loadProjetos();
    this.loadPerfis();

    this.route.paramMap.subscribe(params => {
      const id = params.get('id');
      if (id) {
        this.isEditMode = true;
        this.funcionarioService.getFuncionarioById(+id).subscribe(
          (data) => {
            this.funcionario = data;
          },
          (error) => {
            console.error('Erro ao carregar funcionário para edição:', error);
          }
        );
      }
    });
  }

  loadProjetos(): void {
    this.projetoService.getAllProjetos().subscribe(
      (data) => {
        this.projetos = data;
      },
      (error) => {
        console.error('Erro ao carregar projetos:', error);
      }
    );
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

  saveFuncionario(): void {
    if (this.isEditMode) {
      this.funcionarioService.updateFuncionario(this.funcionario.id!, this.funcionario).subscribe(
        () => {
          this.router.navigate(['/funcionarios']);
        },
        (error) => {
          console.error('Erro ao atualizar funcionário:', error);
        }
      );
    } else {
      this.funcionarioService.createFuncionario(this.funcionario).subscribe(
        () => {
          this.router.navigate(['/funcionarios']);
        },
        (error) => {
          console.error('Erro ao criar funcionário:', error);
        }
      );
    }
  }

  cancel(): void {
    this.router.navigate(['/funcionarios']);
  }
}
