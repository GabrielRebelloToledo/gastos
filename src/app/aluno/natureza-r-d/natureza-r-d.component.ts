import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { UserService } from 'src/app/core/user/user.service';
import { AlunoService } from '../aluno.service';

import { Naturezas } from './natureza';

@Component({
  selector: 'app-natureza-r-d',
  templateUrl: './natureza-r-d.component.html',
  styleUrls: ['./natureza-r-d.component.css']
})
export class NaturezaRDComponent implements OnInit {

  naturezaForm: FormGroup;
  ListaNatureza: Naturezas[]= [];
  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private user: UserService,
    private AlunoService: AlunoService
  ) { }

  ngOnInit(): void {

    let usuarioId = this.user.user.id

    this.naturezaForm = this.formBuilder.group({
      id: [null],
      usuarioId: usuarioId,
      nomeNatureza: ['', Validators.required],
      grupoPai: ['', Validators.required],
      grupoFilho: ['', Validators.required],
      ativo: ['', Validators.required],
      analitico: ['', Validators.required]
     
    });

  }


  pesquisaNaturezas() {
    this.AlunoService.getAllnaturezas().subscribe(result => { this.ListaNatureza = result })
  }

  submit() {
    if (this.naturezaForm.value.id) {
      const atualizarAluno = this.naturezaForm.getRawValue() as Naturezas;
      
      this.AlunoService.update(atualizarAluno).subscribe(
        success => {
          alert('Receita atualizado!')
          this.naturezaForm.reset()

        },
        error => {
          alert('Erro ao atualizar.')
        }
      )
    } else {
      console.log("Aqui!")
      const novoNaturezas = this.naturezaForm.getRawValue() as Naturezas;
      this.AlunoService.createNaturezas(novoNaturezas).subscribe(
        success => {
          alert('Natureza salva!')
          this.naturezaForm.reset()
        },
        error => {
          alert('Erro ao salvar.')
        }
      )
    }
  }


}
