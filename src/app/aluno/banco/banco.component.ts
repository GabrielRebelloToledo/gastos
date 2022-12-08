import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { UserService } from 'src/app/core/user/user.service';
import { Banco } from './banco';
import { AlunoService } from '../aluno.service';
@Component({
  selector: 'app-banco',
  templateUrl: './banco.component.html',
  styleUrls: ['./banco.component.css']
})
export class BancoComponent implements OnInit {
  bancoForm: FormGroup;
  ListaBanco: Banco[]= [];
  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private user: UserService,
    private AlunoService: AlunoService
  ) { }

  ngOnInit(): void {

    let usuarioId = this.user.user.id

    this.bancoForm = this.formBuilder.group({
      id: [null],
      usuarioId: usuarioId,
      abreviatura: ['', Validators.required],
      nomeBanco: ['', Validators.required]
     
    });

  }


  pesquisaBanco() {
    this.AlunoService.getAllBanco().subscribe(result => { this.ListaBanco = result })
  }

  submit() {
    if (this.bancoForm.value.id) {
      const atualizarAluno = this.bancoForm.getRawValue() as Banco;
      
      this.AlunoService.update(atualizarAluno).subscribe(
        success => {
          alert('Receita atualizado!')
          this.bancoForm.reset()

        },
        error => {
          alert('Erro ao atualizar.')
        }
      )
    } else {
      console.log("Aqui!")
      const novoBanco = this.bancoForm.getRawValue() as Banco;
      this.AlunoService.createBanc(novoBanco).subscribe(
        success => {
          alert('Banco salvo!')
          this.bancoForm.reset()
        },
        error => {
          alert('Erro ao salvar.')
        }
      )
    }
  }

}
