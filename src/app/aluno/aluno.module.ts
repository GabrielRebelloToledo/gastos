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
import { BancoComponent } from './banco/banco.component';
import { CentroCustoComponent } from './centro-custo/centro-custo.component';
import { ContaBancariaComponent } from './conta-bancaria/conta-bancaria.component';
import { FinanceiroComponent } from './financeiro/financeiro.component';
import { FornecedoresComponent } from './fornecedores/fornecedores.component';
import { GruposComponent } from './grupos/grupos.component';
import { MarcasComponent } from './marcas/marcas.component';
import { NaturezaRDComponent } from './natureza-r-d/natureza-r-d.component';
import { ProdutosComponent } from './produtos/produtos.component';
import { TipoTituloComponent } from './tipo-titulo/tipo-titulo.component';
import { HeaderComponent } from './header/header.component';
import { HomeComponent } from './home/home.component';



@NgModule({
  declarations: [
    CadastroAlunoComponent, 
    ListaAlunoComponent, CadastroCategoriasComponent, CadastroDespesasComponent, DashboardComponent, BancoComponent, CentroCustoComponent, ContaBancariaComponent, FinanceiroComponent, FornecedoresComponent, GruposComponent, MarcasComponent, NaturezaRDComponent, ProdutosComponent, TipoTituloComponent, HeaderComponent, HomeComponent
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
