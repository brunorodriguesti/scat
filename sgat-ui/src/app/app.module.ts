import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms'; // Import FormsModule
import { HttpClientModule } from '@angular/common/http'; // Import HttpClientModule

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LayoutComponent } from './layout/layout.component';
import { AfastamentosComponent } from './afastamentos/afastamentos.component';
import { HomeComponent } from './home/home.component';

import { ClienteListComponent } from './cliente/cliente-list.component';
import { ClienteFormComponent } from './cliente/cliente-form.component';
import { ProjetoListComponent } from './projeto/projeto-list.component';
import { ProjetoFormComponent } from './projeto/projeto-form.component';
import { PerfilListComponent } from './perfil/perfil-list.component';
import { PerfilFormComponent } from './perfil/perfil-form.component';
import { FuncionarioListComponent } from './funcionario/funcionario-list.component';
import { FuncionarioFormComponent } from './funcionario/funcionario-form.component';
import { FeriadoListComponent } from './feriados/feriado-list.component';
import { FeriadoFormComponent } from './feriados/feriado-form.component';
import { FeriasLicencasListComponent } from './ferias/ferias-licencas-list.component';
import { FeriasLicencasFormComponent } from './ferias/ferias-licencas-form.component';
import { HorasTrabalhadasListComponent } from './controlar-hora-mes/horas-trabalhadas-list.component';
import { HorasTrabalhadasFormComponent } from './controlar-hora-mes/horas-trabalhadas-form.component';

@NgModule({
  declarations: [
    AppComponent,
    LayoutComponent,
    AfastamentosComponent,
    HomeComponent,
    ClienteListComponent,
    ClienteFormComponent,
    ProjetoListComponent,
    ProjetoFormComponent,
    PerfilListComponent,
    PerfilFormComponent,
    FuncionarioListComponent,
    FuncionarioFormComponent,
    FeriadoListComponent,
    FeriadoFormComponent,
    FeriasLicencasListComponent,
    FeriasLicencasFormComponent,
    HorasTrabalhadasListComponent,
    HorasTrabalhadasFormComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule, // Add FormsModule here
    HttpClientModule // Add HttpClientModule here
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
