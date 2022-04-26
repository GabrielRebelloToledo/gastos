import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { map, switchMap } from 'rxjs/operators';
import { Location } from '@angular/common';
import { Receitas } from '../aluno';

import { AlunoService } from '../aluno.service'
import { UserService } from 'src/app/core/user/user.service';
import { Categoria } from '../cadastro-categorias/categoria';


@Component({
  selector: 'app-cadastro-despesas',
  templateUrl: './cadastro-despesas.component.html',
  styleUrls: ['./cadastro-despesas.component.css']
})
export class CadastroDespesasComponent implements OnInit {

  constructor(
    private location: Location,
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private user: UserService,
    private AlunoService: AlunoService
  ) { }

  ListaCategoria: Categoria[]= [];
  ListaAlunos: Receitas[] = [];
  alunoForm: FormGroup;
  
  
  ngOnInit(): void {
    let usuarioId = this.user.user.id
    /* let usuario = this.user.user.id */
    
    this.pesquisaTodos();

    this.route.params
      .pipe(
        map((params: any) => params['id']),
        switchMap(id => this.AlunoService.getById(id))
      )
      .subscribe(aluno => this.editarForm(aluno)
      );

    this.alunoForm = this.formBuilder.group({
      id: [null],
      usuarioId: usuarioId,
      valor: ['', Validators.required],
      categoria: ['', Validators.required],
      descricao: ['', Validators.required],
      data: ['', Validators.required],
    });
  }

  pesquisaTodos() {
    this.AlunoService.getAllCategorias().subscribe(result => { this.ListaCategoria = result })
  }
  

  editarForm(receita: Receitas) {

    this.alunoForm.patchValue(
      {
        id: receita[0].id,
        valor: receita[0].valor,
        descricao: receita[0].descricao,
        data: receita[0].data
      }
    )
  }

  preencheCampos(receita: Receitas) {
    this.alunoForm.patchValue(
      {
        valor: receita.valor,
        descricao: receita.descricao,
        data: receita.data
      });

  }



  submit() {
    if (this.alunoForm.value.id) {
      const atualizarAluno = this.alunoForm.getRawValue() as Receitas;
      
      this.AlunoService.update(atualizarAluno).subscribe(
        success => {
          alert('Despesa atualizada!')
          this.alunoForm.reset()

        },
        error => {
          alert('Erro ao atualizar.')
        }
      )
    } else {
      const novoAluno = this.alunoForm.getRawValue() as Receitas;
      this.AlunoService.createDespesas(novoAluno).subscribe(
        success => {
          alert('Despesa salva!')
          this.alunoForm.reset()
        },
        error => {
          alert('Erro ao salvar.')
        }
      )
    }
  }

}
