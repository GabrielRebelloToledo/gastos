import { Component, OnInit } from '@angular/core';
import { FormControl, FormControlName, FormGroup, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { Receitas } from '../aluno';
import { AlunoService } from '../aluno.service';
import { interval, timer } from 'rxjs';
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {


  constructor(private router: Router, private AlunoService: AlunoService, private formBuilder: FormBuilder,) { }

  ListaReceitasCorrente: Receitas[] = [];
  ListaReceitasPoupanca: Receitas[] = [];
  contadorEsgotado: boolean = true
  contaCorrente;
  contaPoupanca;

  ngOnInit(): void {
    this.captarMeses()
  }

  captarMeses() {
    this.contadorEsgotado = true;

    let mes = (<HTMLInputElement>document.getElementById('meses')).value
    let ano = (<HTMLInputElement>document.getElementById('ano')).value
    let parte1;
    let parte2;

    /*  console.log(mes) */

    switch (mes) {
      case 'jan':
        parte1 = ano + '-01-01',
          parte2 = ano + '-01-31'
        break;
      case 'fev':
        parte1 = ano + '-02-01',
          parte2 = ano + '-02-29'
        break;
      case 'mar':
        parte1 = ano + '-03-01',
          parte2 = ano + '-03-31'
        break;
      case 'abr':
        parte1 = ano + '-04-01',
          parte2 = ano + '-04-30'
        break;
      case 'mai':
        parte1 = ano + '-05-01',
          parte2 = ano + '-05-31'
        break;
      case 'jun':
        parte1 = ano + '-06-01',
          parte2 = ano + '-06-30'
        break;
      case 'jul':
        parte1 = ano + '-07-01',
          parte2 = ano + '-07-31'
        break;
      case 'ago':
        parte1 = ano + '-08-01',
          parte2 = ano + '-08-31'
        break;
      case 'set':
        parte1 = ano + '-09-01',
          parte2 = ano + '-09-30'
        break;
      case 'out':
        parte1 = ano + '-10-01',
          parte2 = ano + '-10-31'
        break;
      case 'nov':
        parte1 = ano + '-11-01',
          parte2 = ano + '-11-30'
        break;
      case 'dez':
        parte1 = ano + '-12-01',
          parte2 = ano + '-12-31'
        break;

      case 'geral':
        parte1 = ano + '-01-01',
          parte2 = ano + '-12-31'
        break;
    }

    /* console.log(parte1)
    console.log(parte2) */

    this.router.navigate(['/dash', parte1, parte2])

    this.AlunoService.getallReceitaContaCorrente(parte1, parte2).subscribe(result => { this.ListaReceitasCorrente = result })
    this.AlunoService.getallReceitaContaPoup(parte1, parte2).subscribe(result => { this.ListaReceitasPoupanca = result })

    this.ver();
  }

  ver() {
    /*  
     console.log( this.contaCorrente) */
    console.log(this.ListaReceitasCorrente.length)
    console.log(this.ListaReceitasCorrente)
    console.log()
    const contador = timer(3000);
    /* console.log(contador) */
    contador.subscribe(() => {
      if (this.ListaReceitasCorrente[0]['usuarioId'] == null) {

        this.contaPoupanca = this.ListaReceitasPoupanca[0]['total']
        this.contaCorrente = 0
        this.contadorEsgotado = false;

     

      } 
      else if (this.ListaReceitasPoupanca[0]['usuarioId'] == null) {
          console.log('Aqui')
          this.contaCorrente = this.ListaReceitasCorrente[0]['total']
          console.log(this.contaCorrente)
          this.contaPoupanca = 0
          this.contadorEsgotado = false;

          
        }


        else {
          this.contaCorrente = this.ListaReceitasCorrente[0]['total']
          this.contaPoupanca = this.ListaReceitasPoupanca[0]['total']
          this.contadorEsgotado = false;

        
        }
    })




  }




}
