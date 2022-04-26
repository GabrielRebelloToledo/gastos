import { Component, OnInit, ViewChild } from '@angular/core';

import {
  /* grafico donut */
  ApexNonAxisChartSeries,
  ApexResponsive,
  ApexFill,
  ApexLegend,
  /* Fim grafico donut */

  /* grafico linha */
  ChartComponent,
  ApexAxisChartSeries,
  ApexChart,
  ApexXAxis,
  ApexDataLabels,
  ApexTitleSubtitle,
  ApexStroke,
  ApexGrid
  /* Fim grafico linha */
} from "ng-apexcharts";

import { Receitas } from '../aluno/aluno';
import { UserService } from '../core/user/user.service';
import { AlunoService } from '../aluno/aluno.service'


export type chartOptionsLine = {

  /* grafico linha */
  series: ApexAxisChartSeries;
  chart: ApexChart;
  xaxis: ApexXAxis;
  dataLabels: ApexDataLabels;
  grid: ApexGrid;
  stroke: ApexStroke;
  title: ApexTitleSubtitle;
  /* fim grafico linha */
};
export type chartOptionsDonut = {

  /* grafico donut */
  series: ApexNonAxisChartSeries;
  chart: ApexChart;
  responsive: ApexResponsive[];
  labels: any;
  fill: ApexFill;
  legend: ApexLegend;
  title: ApexTitleSubtitle;
  dataLabels: ApexDataLabels;
  /* fim grafico dunut */


};
export type chartOptionsColumns = {

  /* grafico Columns */
  series: ApexAxisChartSeries;
  chart: ApexChart;
  dataLabels: ApexDataLabels;
  xaxis: ApexXAxis;
  yaxis: ApexXAxis;
  fill: ApexFill;

  title: ApexTitleSubtitle;
  /* fim grafico Columns */


};
@Component({
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {


  ListaReceitas: Receitas[] = [];
  ListaReceitasSaldo: Receitas[] = [];
  ListaDespesas: Receitas[] = [];
  ListaDespesasSaldo: Receitas[] = [];
  te;
  saldoFinal;


  @ViewChild("chartLine") chart: ChartComponent;
  public chartOptionsLine: Partial<chartOptionsLine>;

  @ViewChild("chartDonut") chart1: ChartComponent;
  public chartOptionsDonut: Partial<chartOptionsDonut>;

  @ViewChild("chartColumns") chart2: ChartComponent;
  public chartOptionsColumns: Partial<chartOptionsColumns>;

  ngOnInit(): void {
    this.receitas();
    this.despesas();
    this.diferenqa();
    
  }
  constructor(private AlunoService: AlunoService,
    private userService: UserService) {
    this.chartOptionsLine = {
      series: [

      ],
      chart: {
        height: 200,
        type: "line",
        zoom: {
          enabled: false
        }
      },
      dataLabels: {
        enabled: true
      },
      stroke: {
        curve: "straight"
      },
      title: {
        text: "Gráfico Score do Paciente ",
        align: "center"
      },
      grid: {
        row: {
          colors: ["#f3f3f3", "transparent"], // takes an array which will be repeated on columns
          opacity: 0.5
        }
      },
      xaxis: {
        categories: [

        ]
      }

    };

    this.chartOptionsColumns = {
      series: [

      ],
      chart: {
        height: 300,
        type: "bar",
      },
      
      dataLabels: {
        
        enabled: true,
        formatter: function (val) {
          return  "R$" + val ;
        },
        
        offsetY: -20,
        style: {
          fontSize: "12px",
          colors: ["#304758"],
          
        }
      },

      xaxis: {
        categories: [
        ],
        position: "top",
        labels: {
          offsetY: -18
        },

        axisBorder: {
          show: true
        },
        axisTicks: {
          show: true
        },
        crosshairs: {
          fill: {
            type: "gradient",
            gradient: {
              colorFrom: "#D8E3F0",
               colorTo: "#BED1E6", 
              stops: [0, 100],
              opacityFrom: 0.4,
              opacityTo: 0.5
            }
          }
        },
        tooltip: {
          enabled: true,
          offsetY: -35
        }
      },
      fill: {
        type: "gradient",
        gradient: {
          shade: "light",
          type: "horizontal",
          shadeIntensity: 0.25,
          gradientToColors: undefined,
          inverseColors: true,
          opacityFrom: 1,
          opacityTo: 1,
         /*  stops: [50, 0, 100, 100] */
        }
      },
      yaxis: {
        axisBorder: {
          show: false
        },
        axisTicks: {
          show: false
        },
        labels: {
          show: false,
          formatter: function (val) {
            return val + "R$";
          }
        }
      },
      title: {
        text: "Monthly Inflation in Argentina, 2002",
        floating: true,
        offsetY: 320,
        align: "center",
        style: {
          color: "#444"
        }
      }
    };

    this.chartOptionsDonut = {
       series: [0,0],
     /*  series: [44, 55, 41], */
      chart: {
        width: 400,
        type: "donut"
      },
      /* labels: ["Despesas", "Balanço"], */
      labels: [],
      dataLabels: {
        enabled: true
      },  

      fill: {
        type: "gradient"
      },
      title: {
        text: "Favourite Movie Type"
      },
      legend: {
        formatter: function (val, opts) {
          return val + " - " + opts.w.globals.series[opts.seriesIndex];
        }
      },
      responsive: [
        {
          breakpoint: 480,
          options: {
            chart: {
              width: 300
            },
            legend: {
              position: "bottom"
            }
          }
        }
      ]

    };

  }

  receitas() {
    this.AlunoService.getAll().subscribe(result => {
      this.ListaReceitas = result;
      //console.log("Consultas:", this.ListaScore);
    })
  }
  despesas() {
    this.AlunoService.getAllDespesas().subscribe(result => {
      this.ListaDespesas = result;
      //console.log("Consultas:", this.ListaScore);
    })
  }

  diferenqa(){
    this.AlunoService.getAllSum().subscribe(result => {
      this.ListaReceitasSaldo = result;
      //console.log("Consultas:", this.ListaScore);
    })
    this.AlunoService.getAllDespesasSum().subscribe(result => {
      this.ListaDespesasSaldo = result;
      //console.log("Consultas:", this.ListaScore);
    })
  }

  


  diferenca(){

   var saldoDespesa = [];
   var saldoReceita = [];
   var valorDesp = [];
   var valorReceita = [];

   for (let i = 0; i < this.ListaDespesasSaldo.length; i++) {
    saldoDespesa.push(Number(this.ListaDespesasSaldo[i].valor).toFixed(2))
    valorDesp.push(this.ListaDespesasSaldo[i].valor)
  }
   for (let i = 0; i < this.ListaReceitasSaldo.length; i++) {
    saldoReceita.push(Number(this.ListaReceitasSaldo[i].valor).toFixed(2))
    valorReceita.push(this.ListaReceitasSaldo[i].valor)
  }

 console.log(Number(saldoDespesa['0'])) 
 console.log(Number(valorReceita['0'])) 


 this.saldoFinal =  Number(valorReceita['0']) - Number(saldoDespesa['0']);

 

  }

  valorAtual() {
    var valores = []
    var data = []
    for (let i = 0; i < this.ListaReceitas.length; i++) {
      valores.push(Number(this.ListaReceitas[i].valor).toFixed(2))
      data.push(this.ListaReceitas[i].data)
    }
    this.chartOptionsLine.series = [{ data: [...valores] }]
    this.chartOptionsLine.xaxis = { categories: data }

/*     console.log(valores);
    console.log(data); */
    this.valorAtualD();
    this.diferenca();
  }

  valorAtualD() {
    var valores = []
    var data = []
    for (let i = 0; i < this.ListaDespesas.length; i++) {
      valores.push(Number(this.ListaDespesas[i].valor).toFixed(2))
      data.push(this.ListaDespesas[i].data)
    }
    this.chartOptionsColumns.series = [{ data: [...valores] }]
    this.chartOptionsColumns.xaxis = { categories: data }

    /* console.log(valores);
    console.log(data); */
    
  }

  
   


}