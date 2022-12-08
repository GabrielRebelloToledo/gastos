import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { UserService } from 'src/app/core/user/user.service';
import { AlunoService } from '../aluno.service';
import { Banco } from '../banco/banco';
import { CentroCusto } from '../centro-custo/centro-custo';
import { ContaBancaria } from '../conta-bancaria/conta-bancaria';
import { Fornecedores } from '../fornecedores/fornecedore';
import { Marcas } from '../marcas/marcas';
import { Naturezas } from '../natureza-r-d/natureza';
import { Produtos } from '../produtos/produtos';
import { tiposTitulo } from '../tipo-titulo/tipostitulo';
import { Financeiro } from './financeiro';
import { Saldos } from './saldos';

@Component({
  selector: 'app-financeiro',
  templateUrl: './financeiro.component.html',
  styleUrls: ['./financeiro.component.css']
})
export class FinanceiroComponent implements OnInit {

  FinanceiroForm: FormGroup;
  MovientoForm: FormGroup;
  ListaContaBancaria: ContaBancaria[] = [];
  ListaBanco: Banco[] = [];
  ListaFornecedores: Fornecedores[] = [];
  ListaMarcas: Marcas[] = [];
  ListaCentroCusto: CentroCusto[] = [];
  ListaNatureza: Naturezas[] = [];
  ListaTipostitulo: tiposTitulo[] = [];
  ListaProdutos: Produtos[] = [];
  ListaMovimentos:Financeiro[]=[]
  ListaReceita:Saldos[]=[]
  ListaDespesa:Saldos[]=[]
  cadastroProduto:boolean = false;

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private user: UserService,
    private AlunoService: AlunoService
  ) { }

  ngOnInit(): void {
    this.pesquisaMarcas();
    this.pesquisaFornecedor();
    this.pesquisanovoConta();
    this.pesquisanovoCentroCusto();
    this.pesquisaNaturezas();
    this.pesquisaTitulo();
    this.pesquisaProdutos();
    let usuarioId = this.user.user.id

    this.FinanceiroForm = this.formBuilder.group({
      id: [null],
      usuarioId: usuarioId,
      fornecedores: ['', Validators.required],
      nomeProd: ['', Validators.required],
      nomeMarca: ['', Validators.required],
      receita_despesa: ['', Validators.required],
      provisao: ['', Validators.required],
      nNota: ['', Validators.required],
      valorUn: ['', Validators.required],
      Quantidade: ['', Validators.required],
      valorTotal: ['', Validators.required],
      dNegociacao: ['', Validators.required],
      dVencimento: ['', Validators.required],
      historico: ['', Validators.required],
      conta: ['', Validators.required],
      titulo: ['', Validators.required],
      parcelado: ['', Validators.required],
      nParcela: ['', Validators.required],
      natureza: ['', Validators.required],
      centro: ['', Validators.required],
      baixado: ['', Validators.required],
      dtBaixa: ['', Validators.required]

    });

  }

  pesquisaMarcas() {
    this.AlunoService.getAllMarcas().subscribe(result => { this.ListaMarcas = result })
  }/* ok */
  pesquisanovoConta() {
    this.AlunoService.getAllConta().subscribe(result => { this.ListaContaBancaria = result })
  }/* ok */
  pesquisaFornecedor() {
    this.AlunoService.getAllFornecedores().subscribe(result => { this.ListaFornecedores = result })
  }/* ok */
  pesquisanovoCentroCusto() {
    this.AlunoService.getAllCentroCusto().subscribe(result => { this.ListaCentroCusto = result })
  }/* ok */
  pesquisaNaturezas() {
    this.AlunoService.getAllnaturezas().subscribe(result => { this.ListaNatureza = result })
  }/* ok */
  pesquisaTitulo() {
    this.AlunoService.getAlltipoTitulo().subscribe(result => { this.ListaTipostitulo = result })
  }/* ok */
  pesquisaProdutos() {
    this.AlunoService.getAllProdutos().subscribe(result => { this.ListaProdutos = result })
  }/* ok */


  pesquisaMovimentos() {
    var data1 = (<HTMLInputElement>document.getElementById("dt1")).value;
    var data2 = (<HTMLInputElement>document.getElementById("dt2")).value;
    console.log(data1,data2)
    if(this.receita){
      this.tipo = 'r'
    }if(this.despesa){
      this.tipo = 'd'
    }if(this.r_d){
      this.tipo = 'r_d'
    }
    if(this.real){
      this.prov = 0
    }if(this.provisao){
      this.prov = 1
    }if(this.r_p){
      this.prov = 'r_p'
    }
    if(this.pendentes){
      this.baix = 0
    }if(this.baixados){
      this.baix = 1
    }if(this.p_b){
      this.baix = 'p_b'
    }
   this.AlunoService.getMovimento(data1,data2,this.tipo,this.prov,this.baix).subscribe(result => { this.ListaMovimentos = result }) 
   this.AlunoService.SumAllReceitas(data1,data2,this.tipo,this.prov,this.baix).subscribe(result => { this.ListaReceita = result,
  this.receitaS = this.ListaReceita[0]['receita']
  }) 
   this.AlunoService.SumAllDespesas(data1,data2,this.tipo,this.prov,this.baix).subscribe(result => { this.ListaDespesa = result,
  this.despesaS = this.ListaDespesa[0]['despesa']
  }) 
  }/* ok */

  baixar(i){
    alert(i)
     this.AlunoService.updateBaixa(i).subscribe(
      success => {
        alert('Baixa atualizada!')
        this.pesquisaMovimentos();
      },
      error => {
        alert('Erro ao atualizar.')
      }
    ) 
  }

  deletarAlunoMovimento(id) {

    if (window.confirm('Tem certeza que deseja excluir este movimento?')) {
      this.AlunoService.deleteMovimento(id).subscribe(result => { this.ListaMovimentos = result; })
      alert('Movimento excluído.')
      this.pesquisaMovimentos();
    }

  }

  receitaS;
  despesaS;
  submit() {
    if (this.FinanceiroForm.value.id) {
      const atualizarAluno = this.FinanceiroForm.getRawValue() as ContaBancaria;

      this.AlunoService.update(atualizarAluno).subscribe(
        success => {
          alert('Receita atualizado!')
          this.FinanceiroForm.reset()

        },
        error => {
          alert('Erro ao atualizar.')
        }
      )
    } else {
      console.log("Aqui!")
      const novoCentroCusto = this.FinanceiroForm.getRawValue() as ContaBancaria;
      this.AlunoService.createConta(novoCentroCusto).subscribe(
        success => {
          alert('Centro de Custo salvo!')
          this.FinanceiroForm.reset()
        },
        error => {
          alert('Erro ao salvar.')
        }
      )
    }
  }

  listaprodutos: [
    {
      id: 1,

    }
  ]

  valorUncaptura;
  Quantidadecaptura;
  valorTotalcaptura;

  calcular() {
    var vUn = parseFloat((<HTMLInputElement>document.getElementById("valorUn")).value);
    var quantidade = parseFloat((<HTMLInputElement>document.getElementById("quant")).value);
    var total = vUn * quantidade
    this.valorTotalcaptura = total;
    this.valorUncaptura = vUn;
    this.Quantidadecaptura = quantidade;
  }

  capturarProdutos() {

    var feed = {

      fornecedores: this.FinanceiroForm.get('fornecedores').value,
      conta: this.FinanceiroForm.get('conta').value,
      centro: this.FinanceiroForm.get('centro').value,
      natureza: this.FinanceiroForm.get('natureza').value,
      nNota: this.FinanceiroForm.get('nNota').value,
      titulo: this.FinanceiroForm.get('titulo').value,
      receita_despesa: this.FinanceiroForm.get('receita_despesa').value,
      dNegociacao: this.FinanceiroForm.get('dNegociacao').value,
      dVencimento: this.FinanceiroForm.get('dVencimento').value,
      nomeProd: this.FinanceiroForm.get('nomeProd').value,
      nomeMarca: this.FinanceiroForm.get('nomeMarca').value,
      provisao: this.FinanceiroForm.get('provisao').value,
      valorUn: this.valorUncaptura,
      quantidade: this.Quantidadecaptura,
      valorTotal: this.valorTotalcaptura,
      parcelado: this.FinanceiroForm.get('parcelado').value,
      nParcela: this.FinanceiroForm.get('nParcela').value,
      baixado: 0,
      dtBaixa: "",
      historico: this.FinanceiroForm.get('historico').value,
    };

    this.data.push(feed);

    console.log(this.data);


  }
  teste() {
    this.formBuilder.group({

    }).getRawValue() as Financeiro
  }


  removerProd(i) {
    console.log(i)
    this.data.splice(i, 1);
  }
  data = [];

  gravar() {
    for (var i = 0; i < this.data.length; i++) {
      this.AlunoService.createFinanceiro(this.data[i]).subscribe(
        success => {
          
          
          
        },
        error => {
          alert('Erro ao salvar.')
        }
      )
    }
    
  }
  novoCadastro(){
    this.FinanceiroForm.reset();
    (<HTMLInputElement>document.getElementById("valorUn")).value = '';
    (<HTMLInputElement>document.getElementById("quant")).value = '';
    this.valorTotalcaptura = '';
    this.valorUncaptura = '';
    this.Quantidadecaptura = '';
    for(var i=0; i < this.data.length; i++){
      this.data.pop();
    }
    
  }

  movimento(i){
    if(i === 'c'){
      this.cadastroProduto = true;
    }else if(i=== 'g'){
      this.cadastroProduto = false;
    }
  }
/* receita/despesa */
  receita:boolean = false;
  despesa:boolean = false;
  r_d:boolean = false;
  tipo;
/* real/provisao */
  real:boolean = false;
  provisao:boolean = false;
  r_p:boolean = false;
  prov;
/* pendentes/baixados */
  pendentes:boolean = false;
  baixados:boolean = false;
  p_b:boolean = false;
  baix;

  termsChange(selected: any): void {
    

      /* Verificando receita/despesa */   
       if(selected.target.value == 'receita' && selected){
        /* console.log("Truer", selected.target.checked) */
        this.receita = selected.target.checked;
        
        }
       if(selected.target.value == 'despesa' && selected ){
        /* console.log("Trued", selected.target.checked) */
        this.despesa = selected.target.checked;
        
        }

        if(this.despesa == true && this.receita == true){
          this.r_d = true;
          /* console.log("Truer_d true") */
        }
         if(this.despesa == false && this.receita == true){
          this.r_d = false;
          console.log("Truer_d - false")
        }
        if(this.despesa == true && this.receita == false){
          this.r_d = false;
          console.log("Truer_d false")
        }

        /* Verificando real/provisão */
        if(selected.target.value == 'real' && selected){
          console.log("Truerp", selected.target.checked)
          this.real = selected.target.checked;
          
          }
         if(selected.target.value == 'provisao' && selected ){
          console.log("Truepp", selected.target.checked)
          this.provisao = selected.target.checked;
          
          }
          if(this.real == true && this.provisao == true){
            this.r_p = true;
            /* console.log("Truer_d true") */
          }
           if(this.real == false && this.provisao == true){
            this.r_p = false;
            console.log("Truer_p - false")
          }
          if(this.real == true && this.provisao == false){
            this.r_p = false;
            console.log("Truer_p false")
          }
        /* Verificando pendentes/baixados */
        if(selected.target.value == 'pendentes' && selected){
          console.log("Truep", selected.target.checked)
          this.pendentes = selected.target.checked;
          
          }
         if(selected.target.value == 'baixados' && selected ){
          console.log("Trueb", selected.target.checked)
          this.baixados = selected.target.checked;
          
          }
          if(this.pendentes == true && this.baixados == true){
            this.p_b = true;
            /* console.log("Truer_d true") */
          }
           if(this.pendentes == false && this.baixados == true){
            this.p_b = false;
            console.log("Truep_b - false")
          }
          if(this.pendentes == true && this.baixados == false){
            this.p_b = false;
            console.log("Truep_b - false")
          }
       
         }
}
