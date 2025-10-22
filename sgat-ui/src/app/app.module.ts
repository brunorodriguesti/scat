import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms'; // Import FormsModule

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ClienteFormComponent } from './cliente-form/cliente-form.component';
import { LayoutComponent } from './layout/layout.component';
import { ProjetoComponent } from './projeto/projeto.component';
import { FuncionarioComponent } from './funcionario/funcionario.component';
import { PerfilComponent } from './perfil/perfil.component';
import { FeriadosComponent } from './feriados/feriados.component';
import { FeriasComponent } from './ferias/ferias.component';
import { AfastamentosComponent } from './afastamentos/afastamentos.component';
import { ControlarHoraMesComponent } from './controlar-hora-mes/controlar-hora-mes.component';
import { HomeComponent } from './home/home.component';

@NgModule({
  declarations: [
    AppComponent,
    ClienteFormComponent,
    LayoutComponent,
    ProjetoComponent,
    FuncionarioComponent,
    PerfilComponent,
    FeriadosComponent,
    FeriasComponent,
    AfastamentosComponent,
    ControlarHoraMesComponent,
    HomeComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule // Add FormsModule here
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
