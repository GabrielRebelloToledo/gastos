import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { UserService } from 'src/app/core/user/user.service';
import { AlunoService } from '../aluno.service';
import { CentroCusto } from './centro-custo';

@Component({
  selector: 'app-centro-custo',
  templateUrl: './centro-custo.component.html',
  styleUrls: ['./centro-custo.component.css']
})
export class CentroCustoComponent implements OnInit {

  centroForm: FormGroup;
  ListaCentroCusto: CentroCusto[]= [];
  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private user: UserService,
    private AlunoService: AlunoService
  ) { }

  ngOnInit(): void {

    let usuarioId = this.user.user.id

    this.centroForm = this.formBuilder.group({
      id: [null],
      usuarioId: usuarioId,
      nomeCentro: ['', Validators.required],
      grupoPai: ['', Validators.required],
      grupoFilho: ['', Validators.required],
      ativo: ['', Validators.required],
      analitico: ['', Validators.required]
     
    });

  }


  pesquisanovoCentroCusto() {
    this.AlunoService.getAllCentroCusto().subscribe(result => { this.ListaCentroCusto = result })
  }

  submit() {
    if (this.centroForm.value.id) {
      const atualizarAluno = this.centroForm.getRawValue() as CentroCusto;
      
      this.AlunoService.update(atualizarAluno).subscribe(
        success => {
          alert('Receita atualizado!')
          this.centroForm.reset()

        },
        error => {
          alert('Erro ao atualizar.')
        }
      )
    } else {
      console.log("Aqui!")
      const novoCentroCusto = this.centroForm.getRawValue() as CentroCusto;
      this.AlunoService.createCentroC(novoCentroCusto).subscribe(
        success => {
          alert('Centro de Custo salvo!')
          this.centroForm.reset()
        },
        error => {
          alert('Erro ao salvar.')
        }
      )
    }
  }


}
