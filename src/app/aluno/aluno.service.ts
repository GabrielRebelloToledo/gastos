import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { EMPTY, Observable } from 'rxjs';
import { take } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { Receitas } from './aluno';
import { CadastroAlunoComponent } from './cadastro-aluno/cadastro-aluno.component';
import { Categoria } from './cadastro-categorias/categoria';

const API = environment.apiUrl;

@Injectable({
  providedIn: 'root'
})
export class AlunoService {

  constructor(
    private http: HttpClient
  ) { }


  getAll(): Observable<Receitas[]> {
    return this.http.get<Receitas[]>(`${API}receita`);
  }
  getAllSum(): Observable<Receitas[]> {
    return this.http.get<Receitas[]>(`${API}receita/sum`);
  }

  create(receitas: Receitas) {
    return this.http.post(`${API}receita`, receitas).pipe(take(1));
  }

  createDespesas(despesas: Receitas) {
    return this.http.post(`${API}despesas`, despesas).pipe(take(1));
  }
  getAllDespesasSum(): Observable<Receitas[]> {
    return this.http.get<Receitas[]>(`${API}despesas/sum`);
  }
  getAllDespesas(): Observable<Receitas[]> {
    return this.http.get<Receitas[]>(`${API}despesas`);
  }
  
  createCategoria(categoria: Categoria) {
    return this.http.post(`${API}categoria`, categoria).pipe(take(1));
  }

  getAllCategorias(): Observable<Categoria[]> {
    return this.http.get<Categoria[]>(`${API}categoria`);
  }

 
  
  getById(id) {
    if (!id) return EMPTY;
    return this.http.get<Receitas>(`${API}aluno/${id}`);
  }

  getByIdCategoria(id) {
    if (!id) return EMPTY;
    return this.http.get<Categoria>(`${API}aluno/${id}`);
  }

  updateCategoria(update) {
    console.log(update)
    return this.http.put(`${API}categoria/${update.id}`, update).pipe(take(1));
  }

  update(update) {
    console.log(update)
    return this.http.put(`${API}aluno/${update.id}`, update).pipe(take(1));
  }

  delete(id) {
    return this.http.delete<Receitas[]>(`${API}aluno/${id}`);
  }

  getallReceitaContaCorrente(p1,p2){
    return this.http.get<Receitas[]>(`${API}receita/${p1}/${p2}`);
  }
  getallReceitaContaPoup(p1,p2){
    return this.http.get<Receitas[]>(`${API}receita/poup/${p1}/${p2}`);
  }

}


