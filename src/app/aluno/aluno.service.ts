import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { EMPTY, Observable } from 'rxjs';
import { take } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { Receitas } from './aluno';
import { Banco } from './banco/banco';
import { CadastroAlunoComponent } from './cadastro-aluno/cadastro-aluno.component';
import { Categoria } from './cadastro-categorias/categoria';
import { CentroCusto } from './centro-custo/centro-custo';
import { ContaBancaria } from './conta-bancaria/conta-bancaria';
import { Financeiro } from './financeiro/financeiro';
import { Saldos } from './financeiro/saldos';
import { Fornecedores } from './fornecedores/fornecedore';
import { Grupos } from './grupos/grupos';
import { Marcas } from './marcas/marcas';
import { Naturezas } from './natureza-r-d/natureza';
import { Produtos } from './produtos/produtos';
import { tiposTitulo } from './tipo-titulo/tipostitulo';

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

  /* Inicio nova config */

  /* banco */
  createBanc(banco: Banco) {
    console.log(banco);
    return this.http.post(`${API}banco`, banco).pipe(take(1));
  }
  getAllBanco(): Observable<Banco[]> {
    return this.http.get<Banco[]>(`${API}banco`);
  }
  
  /* Centro de Custo */
  createCentroC(centrocusto: CentroCusto) {
    console.log(centrocusto);
    return this.http.post(`${API}centrocusto`, centrocusto).pipe(take(1));
  }
  getAllCentroCusto(): Observable<CentroCusto[]> {
    return this.http.get<CentroCusto[]>(`${API}centrocusto`);
  }
  /* Conta Bancaria */
  createConta(contabancaria: ContaBancaria) {
    return this.http.post(`${API}contabanco`, contabancaria).pipe(take(1));
  }
  getAllConta(): Observable<ContaBancaria[]> {
    return this.http.get<ContaBancaria[]>(`${API}contabanco`);
  }
  /* Financeiro */
  createFinanceiro(financeiro: Financeiro) {
    console.log(financeiro)
    return this.http.post(`${API}financeiro`, financeiro).pipe(take(1));
  }
  getMovimento(d1,d2,t,p,b) {
    console.log(t,p,b)
     return this.http.get<Financeiro[]>(`${API}financeiro/${d1}/${d2}/${t}/${p}/${b}`); 
  }
  SumAllReceitas(d1,d2,t,p,b) {
    console.log(t,p,b)
     return this.http.get<Saldos[]>(`${API}financeiro/sumReceita/${d1}/${d2}/${t}/${p}/${b}`); 
  }
  SumAllDespesas(d1,d2,t,p,b) {
    console.log(t,p,b)
     return this.http.get<Saldos[]>(`${API}financeiro/sumDespesa/${d1}/${d2}/${t}/${p}/${b}`); 
  }
  updateBaixa(update) {
    console.log(update)
    var dados = {
      id:update
    }
    console.log(dados)
    return this.http.put(`${API}financeiro/baixa/${dados.id}`, dados).pipe(take(1));
  }
  deleteMovimento(id) {
    return this.http.delete<Financeiro[]>(`${API}financeiro/${id}`);
  }
  /* Fornecedores */
  createFornecedor(fornecedor: Fornecedores) {
    return this.http.post(`${API}fornecedores`, fornecedor).pipe(take(1));
  }
  getAllFornecedores(): Observable<Fornecedores[]> {
    return this.http.get<Fornecedores[]>(`${API}fornecedores`);
  }
  /* Grupos */
  createGrupos(grupos: Grupos) {
    return this.http.post(`${API}grupo`, grupos).pipe(take(1));
  }
  getAllGrupos(): Observable<Grupos[]> {
    return this.http.get<Grupos[]>(`${API}grupo`);
  }
  /* Marcas */
  createMarcas(marcas: Marcas) {
    return this.http.post(`${API}marcas`, marcas).pipe(take(1));
  }
  getAllMarcas(): Observable<Marcas[]> {
    return this.http.get<Marcas[]>(`${API}marcas`);
  }
  /* Naturezas */
  createNaturezas(naturezas: Naturezas) {
    return this.http.post(`${API}naturezas`, naturezas).pipe(take(1));
  }
  
  getAllnaturezas(): Observable<Naturezas[]> {
    return this.http.get<Naturezas[]>(`${API}naturezas`);
  }
  /* Produtos */
  createProdutos(produtos: Produtos) {
    return this.http.post(`${API}produtos`, produtos).pipe(take(1));
  }
  getAllProdutos(): Observable<Produtos[]> {
    return this.http.get<Produtos[]>(`${API}produtos`);
  }
  
  /* Tipos Titulo */
  createtipostitulo(tipostitulo: tiposTitulo) {
    return this.http.post(`${API}tipostitulo`, tipostitulo).pipe(take(1));
  }
  getAlltipoTitulo(): Observable<tiposTitulo[]> {
    return this.http.get<tiposTitulo[]>(`${API}tipostitulo`);
  }
}


