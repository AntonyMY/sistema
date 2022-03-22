import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './pages/home/home.component';
import { DashboardRoutingModule } from './dashboard-routing.module';
import { PrimeNGModule } from '../prime-ng/prime-ng.module';

@NgModule({
  declarations: [
    HomeComponent,    
  ],
  imports: [
    CommonModule,

    PrimeNGModule,
    DashboardRoutingModule,
  ]
})
export class DashboardModule { }
