import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './pages/home/home.component';
import { DashboardRoutingModule } from './dashboard-routing.module';
import { PrimeNGModule } from '../prime-ng/prime-ng.module';
import { MenuService } from './service/menu.service';

@NgModule({
  declarations: [
    HomeComponent,    
  ],
  imports: [
    CommonModule,

    PrimeNGModule,
    DashboardRoutingModule,
  ],
  providers:[
    MenuService,
  ]
})
export class DashboardModule { }
