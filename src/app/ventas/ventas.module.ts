import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http'

import { PrimeNGModule } from '../prime-ng/prime-ng.module';
import { VentasRoutingModule } from './ventas-routing.module';
import { VentaLista3Component } from './page/lista3/venta-lista3.component';
import { VentasService } from './services/ventas.service';
import { VentaListaComponent } from './page/lista/venta-lista.component';


@NgModule({
  declarations: [
    VentaLista3Component,
    VentaListaComponent,    
  ],
  imports: [
    CommonModule,
    FormsModule,
    HttpClientModule,

    PrimeNGModule,    
    VentasRoutingModule
  ],
  providers:[
    VentasService,
  ]
})
export class VentasModule { }
