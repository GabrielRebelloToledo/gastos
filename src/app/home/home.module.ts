import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgApexchartsModule } from "ng-apexcharts";
import { HomeComponent } from './home.component';
import { RouterModule } from '@angular/router';

@NgModule({
    declarations: [
        HomeComponent
    ],
    imports: [
        CommonModule,
        RouterModule,
        NgApexchartsModule
    ]
})
export class HomeModule{

}