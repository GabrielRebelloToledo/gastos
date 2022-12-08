import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LoginComponent } from './core/login/login.component';
import { HomeComponent } from './aluno/home/home.component';
import { LoginGuard } from './core/auth/login.guard';
import { AuthGuard } from './core/auth/auth.guard';
import { CadastroAlunoComponent } from './aluno/cadastro-aluno/cadastro-aluno.component';
import { ListaAlunoComponent } from './aluno/lista-aluno/lista-aluno.component';
import { CadastroCategoriasComponent } from './aluno/cadastro-categorias/cadastro-categorias.component';
import { CadastroDespesasComponent } from './aluno/cadastro-despesas/cadastro-despesas.component';
import { DashboardComponent } from './aluno/dashboard/dashboard.component';
import { BancoComponent } from './aluno/banco/banco.component';
import { CentroCustoComponent } from './aluno/centro-custo/centro-custo.component';
import { ContaBancariaComponent } from './aluno/conta-bancaria/conta-bancaria.component';
import { FinanceiroComponent } from './aluno/financeiro/financeiro.component';
import { FornecedoresComponent } from './aluno/fornecedores/fornecedores.component';
import { GruposComponent } from './aluno/grupos/grupos.component';
import { MarcasComponent } from './aluno/marcas/marcas.component';
import { NaturezaRDComponent } from './aluno/natureza-r-d/natureza-r-d.component';
import { ProdutosComponent } from './aluno/produtos/produtos.component';
import { TipoTituloComponent } from './aluno/tipo-titulo/tipo-titulo.component';

const routes: Routes = [
    {
        path: '',
        pathMatch: 'full',
        redirectTo: 'login',
    },
    {
        path: 'login',
        component: LoginComponent,
        canActivate: [LoginGuard]
    },
    {
        path: 'home',
        component: HomeComponent,
        /* canActivate: [AuthGuard] */
    },
    {
        path: 'dash',
        component: DashboardComponent,
        /* canActivate: [AuthGuard] */
    },
    {
        path: 'dash/:id1/:id2',
        component: DashboardComponent,
        /* canActivate: [AuthGuard] */
    },
    {
        path: 'cadastrar/receita',
        component: CadastroAlunoComponent,
        /* canActivate: [AuthGuard] */
    },
    {
        path: 'lista/aluno',
        component: ListaAlunoComponent,
       /*  canActivate: [AuthGuard] */
    },
    {
        path: 'cadastrar/categoria',
        component: CadastroCategoriasComponent,
        /* canActivate: [AuthGuard] */
    },
    {
        path: 'cadastrar/despesas',
        component: CadastroDespesasComponent,
        /* canActivate: [AuthGuard] */
    },
    {
        path: 'banco',
        component: BancoComponent,
        /* canActivate: [AuthGuard] */
    },
    {
        path: 'centro/custo',
        component: CentroCustoComponent,
        /* canActivate: [AuthGuard] */
    },
    {
        path: 'conta/bancaria',
        component: ContaBancariaComponent,
        /* canActivate: [AuthGuard] */
    },
    {
        path: 'financeiro',
        component: FinanceiroComponent,
        /* canActivate: [AuthGuard] */
    },
    {
        path: 'fornecedores',
        component: FornecedoresComponent,
        /* canActivate: [AuthGuard] */
    },
    {
        path: 'grupos',
        component: GruposComponent,
        /* canActivate: [AuthGuard] */
    },
    {
        path: 'marcas',
        component: MarcasComponent,
        /* canActivate: [AuthGuard] */
    },
    {
        path: 'natureza',
        component: NaturezaRDComponent,
        /* canActivate: [AuthGuard] */
    },
    {
        path: 'produtos',
        component: ProdutosComponent,
        /* canActivate: [AuthGuard] */
    },
    {
        path: 'tipo/titulo',
        component: TipoTituloComponent,
        /* canActivate: [AuthGuard] */
    },


    
]

@NgModule({
    imports: [ 
        RouterModule.forRoot(routes, { useHash: true, relativeLinkResolution: 'legacy' } ) 
    ],
    exports: [ RouterModule ]
})
export class AppRoutingModule{
    
}