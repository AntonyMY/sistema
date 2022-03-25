import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http'

import { PrimeNGModule } from '../prime-ng/prime-ng.module';
import { MainRoutingModule } from './main-routing.module';
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
    MainRoutingModule,
  ],
  providers:[
    MenusService,
  ]
})
export class MainModule { }
