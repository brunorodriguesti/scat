import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FeriasLicencas, FeriasLicencasService } from './ferias-licencas.service';
import { Funcionario, FuncionarioService } from '../funcionario/funcionario.service';

@Component({
  selector: 'app-ferias-licencas-form',
  templateUrl: './ferias-licencas-form.component.html',
  styleUrls: ['./ferias-licencas-form.component.css']
})
export class FeriasLicencasFormComponent implements OnInit {
  feriasLicencas: FeriasLicencas = {
    dataInicio: '',
    dataFim: '',
    descricao: '',
    funcionarioId: 0,
    horasAfastadas: '00:00:00'
  };
  funcionarios: Funcionario[] = [];
  isEditMode: boolean = false;

  constructor(
    private feriasLicencasService: FeriasLicencasService,
    private funcionarioService: FuncionarioService,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.loadFuncionarios();

    this.route.paramMap.subscribe(params => {
      const id = params.get('id');
      if (id) {
        this.isEditMode = true;
        this.feriasLicencasService.getFeriasLicencasById(+id).subscribe(
          (data) => {
            this.feriasLicencas = data;
          },
          (error) => {
            console.error('Erro ao carregar férias/licença para edição:', error);
          }
        );
      }
    });
  }

  loadFuncionarios(): void {
    this.funcionarioService.getAllFuncionarios().subscribe(
      (data) => {
        this.funcionarios = data;
      },
      (error) => {
        console.error('Erro ao carregar funcionários:', error);
      }
    );
  }

  saveFeriasLicencas(): void {
    if (this.isEditMode) {
      this.feriasLicencasService.updateFeriasLicencas(this.feriasLicencas.id!, this.feriasLicencas).subscribe(
        () => {
          this.router.navigate(['/ferias-licencas']);
        },
        (error) => {
          console.error('Erro ao atualizar férias/licença:', error);
        }
      );
    } else {
      this.feriasLicencasService.createFeriasLicencas(this.feriasLicencas).subscribe(
        () => {
          this.router.navigate(['/ferias-licencas']);
        },
        (error) => {
          console.error('Erro ao criar férias/licença:', error);
        }
      );
    }
  }

  cancel(): void {
    this.router.navigate(['/ferias-licencas']);
  }
}
