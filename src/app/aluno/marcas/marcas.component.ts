import { Component, OnInit } from '@angular/core';
import { Marcas } from './marcas';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { UserService } from 'src/app/core/user/user.service';
import { AlunoService } from '../aluno.service';
@Component({
  selector: 'app-marcas',
  templateUrl: './marcas.component.html',
  styleUrls: ['./marcas.component.css']
})
export class MarcasComponent implements OnInit {

 
  marcasForm: FormGroup;
  ListaMarcas: Marcas[]= [];
  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private user: UserService,
    private AlunoService: AlunoService
  ) { }

  ngOnInit(): void {

    let usuarioId = this.user.user.id

    this.marcasForm = this.formBuilder.group({
      id: [null],
      usuarioId: usuarioId,
      nomeMarca: ['', Validators.required],
      
     
    });

  }


  pesquisaMarcas() {
    this.AlunoService.getAllMarcas().subscribe(result => { this.ListaMarcas = result })
  }

  submit() {
    if (this.marcasForm.value.id) {
      const atualizarAluno = this.marcasForm.getRawValue() as Marcas;
      
      this.AlunoService.update(atualizarAluno).subscribe(
        success => {
          alert('Receita atualizado!')
          this.marcasForm.reset()

        },
        error => {
          alert('Erro ao atualizar.')
        }
      )
    } else {
      console.log("Aqui!")
      const novoMarca = this.marcasForm.getRawValue() as Marcas;
      this.AlunoService.createMarcas(novoMarca).subscribe(
        success => {
          alert('Marca salva!')
          this.marcasForm.reset()
        },
        error => {
          alert('Erro ao salvar.')
        }
      )
    }
  }


}

