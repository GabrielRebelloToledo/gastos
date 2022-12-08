import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { UserService } from 'src/app/core/user/user.service';
import { AlunoService } from '../aluno.service';
import { Produtos } from './produtos';
@Component({
  selector: 'app-produtos',
  templateUrl: './produtos.component.html',
  styleUrls: ['./produtos.component.css']
})
export class ProdutosComponent implements OnInit {

  produtosForm: FormGroup;
  ListaProdutos: Produtos[]= [];
  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private user: UserService,
    private AlunoService: AlunoService
  ) { }

  ngOnInit(): void {

    let usuarioId = this.user.user.id

    this.produtosForm = this.formBuilder.group({
      id: [null],
      usuarioId: usuarioId,
      nomeProd: ['', Validators.required],
      min: ['', Validators.required],
      max: ['', Validators.required],
      ativo: ['', Validators.required],
      
    });

  }


  pesquisaProdutos() {
    this.AlunoService.getAllProdutos().subscribe(result => { this.ListaProdutos = result })
  }

  submit() {
    if (this.produtosForm.value.id) {
      const atualizarAluno = this.produtosForm.getRawValue() as Produtos;
      
      this.AlunoService.update(atualizarAluno).subscribe(
        success => {
          alert('Receita atualizado!')
          this.produtosForm.reset()

        },
        error => {
          alert('Erro ao atualizar.')
        }
      )
    } else {
      console.log("Aqui!")
      const novoCentroCusto = this.produtosForm.getRawValue() as Produtos;
      this.AlunoService.createProdutos(novoCentroCusto).subscribe(
        success => {
          alert('Produto salvo!')
          this.produtosForm.reset()
        },
        error => {
          alert('Erro ao salvar.')
        }
      )
    }
  }

}
