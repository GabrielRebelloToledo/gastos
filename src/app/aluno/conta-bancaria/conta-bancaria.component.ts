import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { UserService } from 'src/app/core/user/user.service';
import { ContaBancaria } from './conta-bancaria';
import { AlunoService } from '../aluno.service';
import { Banco } from '../banco/banco';
@Component({
  selector: 'app-conta-bancaria',
  templateUrl: './conta-bancaria.component.html',
  styleUrls: ['./conta-bancaria.component.css']
})
export class ContaBancariaComponent implements OnInit {

  ContaBancariaForm: FormGroup;
  ListaContaBancaria: ContaBancaria[]= [];
  ListaBanco: Banco[]= [];
  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private user: UserService,
    private AlunoService: AlunoService
  ) { }

  ngOnInit(): void {

    this.pesquisaBanco();
    
    let usuarioId = this.user.user.id

    this.ContaBancariaForm = this.formBuilder.group({
      id: [null],
      usuarioId: usuarioId,
      nConta: ['', Validators.required],
      descricao: ['', Validators.required],
      banco: ['', Validators.required],
      agencia: ['', Validators.required],
      conta: ['', Validators.required],
      ativo: ['', Validators.required],
      saldo: ['', Validators.required]
      
    });

  }


  pesquisanovoConta() {
    this.AlunoService.getAllConta().subscribe(result => { this.ListaContaBancaria = result })
  }
  pesquisaBanco() {
    this.AlunoService.getAllBanco().subscribe(result => { this.ListaBanco = result })
  }

  submit() {
    if (this.ContaBancariaForm.value.id) {
      const atualizarAluno = this.ContaBancariaForm.getRawValue() as ContaBancaria;
      
      this.AlunoService.update(atualizarAluno).subscribe(
        success => {
          alert('Receita atualizado!')
          this.ContaBancariaForm.reset()

        },
        error => {
          alert('Erro ao atualizar.')
        }
      )
    } else {
      console.log("Aqui!")
      const novoCentroCusto = this.ContaBancariaForm.getRawValue() as ContaBancaria;
      this.AlunoService.createConta(novoCentroCusto).subscribe(
        success => {
          alert('Centro de Custo salvo!')
          this.ContaBancariaForm.reset()
        },
        error => {
          alert('Erro ao salvar.')
        }
      )
    }
  }

}
