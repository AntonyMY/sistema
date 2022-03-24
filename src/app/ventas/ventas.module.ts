import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http'

import { PrimeNGModule } from '../prime-ng/prime-ng.module';
import { VentaListaComponent } from './page/lista/venta-lista.component';
import { VentasService } from './services/ventas.service';
import { Lista2Component } from './page/lista2/lista2.component';

@NgModule({
  declarations: [
    VentaListaComponent,
    Lista2Component,    
  ],
  imports: [
    CommonModule,
    FormsModule,
    HttpClientModule,

    PrimeNGModule,    
  ],
  providers:[
    VentasService,
  ]
})
export class VentasModule { }
