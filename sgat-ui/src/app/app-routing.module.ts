import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ClienteFormComponent } from './cliente-form/cliente-form.component';
import { ProjetoComponent } from './projeto/projeto.component';
import { FuncionarioComponent } from './funcionario/funcionario.component';
import { PerfilComponent } from './perfil/perfil.component';
import { FeriadosComponent } from './feriados/feriados.component';
import { FeriasComponent } from './ferias/ferias.component';
import { AfastamentosComponent } from './afastamentos/afastamentos.component';
import { ControlarHoraMesComponent } from './controlar-hora-mes/controlar-hora-mes.component';
import { HomeComponent } from './home/home.component';

const routes: Routes = [
  { path: 'cadastro/cliente', component: ClienteFormComponent },
  { path: 'cadastro/projeto', component: ProjetoComponent },
  { path: 'cadastro/funcionario', component: FuncionarioComponent },
  { path: 'cadastro/perfil', component: PerfilComponent },
  { path: 'configuracoes/feriados', component: FeriadosComponent },
  { path: 'configuracoes/ferias', component: FeriasComponent },
  { path: 'configuracoes/afastamentos', component: AfastamentosComponent },
  { path: 'controle-horas/controlar-hora-mes', component: ControlarHoraMesComponent },
  { path: '', component: HomeComponent, pathMatch: 'full' }, // Default route
  { path: 'home', component: HomeComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }