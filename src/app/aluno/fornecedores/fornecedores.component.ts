import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { UserService } from 'src/app/core/user/user.service';
import { AlunoService } from '../aluno.service';
import { Fornecedores } from './fornecedore';

@Component({
  selector: 'app-fornecedores',
  templateUrl: './fornecedores.component.html',
  styleUrls: ['./fornecedores.component.css']
})
export class FornecedoresComponent implements OnInit {

  FornecedoresForm: FormGroup;
  ListaFornecedores: Fornecedores[]= [];
  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private user: UserService,
    private AlunoService: AlunoService
  ) { }

  ngOnInit(): void {

    let usuarioId = this.user.user.id

    this.FornecedoresForm = this.formBuilder.group({
      id: [null],
      usuarioId: usuarioId,
      tipoPessoa: ['', Validators.required],
      nomeFantasia: ['', Validators.required],
      razaoSocial: ['', Validators.required],
      CNPJ_CPF: ['', Validators.required],
      perfil: ['', Validators.required],
      ativo: ['', Validators.required]
    });

  }


  pesquisaFornecedor() {
    this.AlunoService.getAllFornecedores().subscribe(result => { this.ListaFornecedores = result })
  }

  submit() {
    if (this.FornecedoresForm.value.id) {
      const atualizarAluno = this.FornecedoresForm.getRawValue() as Fornecedores;
      
      this.AlunoService.update(atualizarAluno).subscribe(
        success => {
          alert('Receita atualizado!')
          this.FornecedoresForm.reset()

        },
        error => {
          alert('Erro ao atualizar.')
        }
      )
    } else {
      console.log("Aqui!")
      const novoCentroCusto = this.FornecedoresForm.getRawValue() as Fornecedores;
      this.AlunoService.createFornecedor(novoCentroCusto).subscribe(
        success => {
          alert('Fornecedor salvo!')
          this.FornecedoresForm.reset()
        },
        error => {
          alert('Erro ao salvar.')
        }
      )
    }
  }

}

