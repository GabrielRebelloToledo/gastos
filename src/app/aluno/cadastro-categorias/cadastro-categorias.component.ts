import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { map, switchMap } from 'rxjs/operators';
import { Location } from '@angular/common';

import { AlunoService } from '../aluno.service'
import { UserService } from 'src/app/core/user/user.service';
import { Categoria } from './categoria';

@Component({
  selector: 'app-cadastro-categorias',
  templateUrl: './cadastro-categorias.component.html',
  styleUrls: ['./cadastro-categorias.component.css']
})
export class CadastroCategoriasComponent implements OnInit {
  categoriaForm: FormGroup;
  constructor(
    private location: Location,
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private user: UserService,
    private AlunoService: AlunoService
  ) { }

  ngOnInit(): void {

    let usuario = this.user.user.id
   console.log(usuario)

   

    this.route.params
      .pipe(
        map((params: any) => params['id']),
        switchMap(id => this.AlunoService.getByIdCategoria(id))
      )
      .subscribe(categoria => this.editarForm(categoria)
      );

    this.categoriaForm = this.formBuilder.group({
      id: [null],
      usuarioId: usuario,
      categoria: ['', Validators.required],
      tipo: ['', Validators.required],
      
    });
  }

  

  editarForm(aluno: Categoria) {

    this.categoriaForm.patchValue(
      {
        id: aluno[0].id,
        categoria: aluno[0].categoria
        
      }
    )
  }

  preencheCampos(aluno: Categoria) {
    this.categoriaForm.patchValue(
      {
        categoria: aluno.categoria,
        
      });

  }

  ver(){
    var nome = (<HTMLInputElement>document.getElementById("inlineRadio1")).value;
  }

  

  submit1() {
    /* if (this.categoriaForm.value.id) {
      const atualizarAluno = this.categoriaForm.getRawValue() as Categoria;
      
      this.AlunoService.update(atualizarAluno).subscribe(
        success => {
          alert('Categoria atualizada!')
          this.categoriaForm.reset()

        },
        error => {
          alert('Erro ao atualizar.')
        }
      )
    } else { */
      const novaCategoria = this.categoriaForm.getRawValue() as Categoria;
      this.AlunoService.createCategoria(novaCategoria).subscribe(
        success => {
          alert('Categoria salva!')
          this.categoriaForm.reset()
          window.location.reload();
        },
        error => {
          alert('Erro ao salvar.')
        }
      )
    }
  }

/* } */