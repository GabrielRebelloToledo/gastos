import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LoginComponent } from './core/login/login.component';
import { HomeComponent } from './home/home.component';
import { LoginGuard } from './core/auth/login.guard';
import { AuthGuard } from './core/auth/auth.guard';
import { CadastroAlunoComponent } from './aluno/cadastro-aluno/cadastro-aluno.component';
import { ListaAlunoComponent } from './aluno/lista-aluno/lista-aluno.component';
import { CadastroCategoriasComponent } from './aluno/cadastro-categorias/cadastro-categorias.component';
import { CadastroDespesasComponent } from './aluno/cadastro-despesas/cadastro-despesas.component';

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
        canActivate: [AuthGuard]
    },
    {
        path: 'cadastrar/receita',
        component: CadastroAlunoComponent,
        canActivate: [AuthGuard]
    },
    {
        path: 'lista/aluno',
        component: ListaAlunoComponent,
        canActivate: [AuthGuard]
    },
    {
        path: 'cadastrar/categoria',
        component: CadastroCategoriasComponent,
        canActivate: [AuthGuard]
    },
    {
        path: 'cadastrar/despesas',
        component: CadastroDespesasComponent,
        canActivate: [AuthGuard]
    }
    
]

@NgModule({
    imports: [ 
        RouterModule.forRoot(routes, { useHash: true, relativeLinkResolution: 'legacy' } ) 
    ],
    exports: [ RouterModule ]
})
export class AppRoutingModule{
    
}