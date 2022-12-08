import { Grupos } from './grupos';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { UserService } from 'src/app/core/user/user.service';
import { AlunoService } from '../aluno.service';

@Component({
  selector: 'app-grupos',
  templateUrl: './grupos.component.html',
  styleUrls: ['./grupos.component.css']
})
export class GruposComponent implements OnInit {

  grupoForm: FormGroup;
  Listagrupo: Grupos[]= [];
  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private user: UserService,
    private AlunoService: AlunoService
  ) { }

  ngOnInit(): void {

    let usuarioId = this.user.user.id

    this.grupoForm = this.formBuilder.group({
      id: [null],
      usuarioId: usuarioId,
      nomeGrupo: ['', Validators.required],
      grupoPai: ['', Validators.required],
      grupoFilho: ['', Validators.required],
      ativo: ['', Validators.required],
      analitico: ['', Validators.required]
     
    });

  }


  pesquisaGrupo() {
    this.AlunoService.getAllGrupos().subscribe(result => { this.Listagrupo = result })
  }

  submit() {
    if (this.grupoForm.value.id) {
      const atualizarAluno = this.grupoForm.getRawValue() as Grupos;
      
      this.AlunoService.update(atualizarAluno).subscribe(
        success => {
          alert('Receita atualizado!')
          this.grupoForm.reset()

        },
        error => {
          alert('Erro ao atualizar.')
        }
      )
    } else {
      console.log("Aqui!")
      const novoGrupos = this.grupoForm.getRawValue() as Grupos;
      this.AlunoService.createGrupos(novoGrupos).subscribe(
        success => {
          alert('Grupo salvo!')
          this.grupoForm.reset()
        },
        error => {
          alert('Erro ao salvar.')
        }
      )
    }
  }


}

