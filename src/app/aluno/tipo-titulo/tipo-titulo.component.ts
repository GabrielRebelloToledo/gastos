import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { UserService } from 'src/app/core/user/user.service';
import { AlunoService } from '../aluno.service';
import { tiposTitulo } from './tipostitulo';

@Component({
  selector: 'app-tipo-titulo',
  templateUrl: './tipo-titulo.component.html',
  styleUrls: ['./tipo-titulo.component.css']
})
export class TipoTituloComponent implements OnInit {

 tituloForm: FormGroup;
  ListaTipostitulo: tiposTitulo[]= [];
  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private user: UserService,
    private AlunoService: AlunoService
  ) { }

  ngOnInit(): void {

    let usuarioId = this.user.user.id

    this.tituloForm = this.formBuilder.group({
      id: [null],
      usuarioId: usuarioId,
      descricao: ['', Validators.required],
      subtipo: ['', Validators.required],
      ativo: ['', Validators.required],
     
    });

  }


  pesquisaTitulo() {
    this.AlunoService.getAlltipoTitulo().subscribe(result => { this.ListaTipostitulo = result })
  }

  submit() {
    if (this.tituloForm.value.id) {
      const atualizarAluno = this.tituloForm.getRawValue() as tiposTitulo;
      
      this.AlunoService.update(atualizarAluno).subscribe(
        success => {
          alert('Receita atualizado!')
          this.tituloForm.reset()

        },
        error => {
          alert('Erro ao atualizar.')
        }
      )
    } else {
      console.log("Aqui!")
      const novoTitulo = this.tituloForm.getRawValue() as tiposTitulo;
      this.AlunoService.createtipostitulo(novoTitulo).subscribe(
        success => {
          alert('Tipo de titulo salvo!')
          this.tituloForm.reset()
        },
        error => {
          alert('Erro ao salvar.')
        }
      )
    }
  }


}


