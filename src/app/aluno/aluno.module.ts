import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { CadastroAlunoComponent } from './cadastro-aluno/cadastro-aluno.component';
import { ListaAlunoComponent } from './lista-aluno/lista-aluno.component';
import { AppRoutingModule } from '../app.routing.module';
import { CadastroCategoriasComponent } from './cadastro-categorias/cadastro-categorias.component';
import { CadastroDespesasComponent } from './cadastro-despesas/cadastro-despesas.component';
import { DashboardComponent } from './dashboard/dashboard.component';



@NgModule({
  declarations: [
    CadastroAlunoComponent, 
    ListaAlunoComponent, CadastroCategoriasComponent, CadastroDespesasComponent, DashboardComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule,
    FormsModule,
    BrowserModule,
    AppRoutingModule
  ],
  exports: [
    CadastroAlunoComponent, 
    ListaAlunoComponent
  ]
})
export class AlunoModule { }
