import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http'

import { PrimeNGModule } from '../prime-ng/prime-ng.module';
import { DashboardRoutingModule } from './dashboard-routing.module';
import { MenusService } from './service/menus.service';
import { HomeComponent } from './pages/home/home.component';

@NgModule({
  declarations: [
    HomeComponent,    
  ],
  imports: [
    CommonModule,
    HttpClientModule,

    PrimeNGModule,
    DashboardRoutingModule,
  ],
  providers:[
    MenusService,
  ]
})
export class DashboardModule { }
