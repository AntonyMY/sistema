import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { PrimeNGModule } from '../prime-ng/prime-ng.module';
import { MantenimientoRoutingModule } from './mantenimiento-routing.module';
import { LineasComponent } from './pages/lineas/lineas.component';
import { MantenimientoService } from './services/mantenimiento.service';
import { ArticulosComponent } from './pages/articulos/articulos.component';



@NgModule({
  declarations: [
    LineasComponent,
    ArticulosComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    HttpClientModule,

    PrimeNGModule,
    MantenimientoRoutingModule,
  ],
  providers:[
    MantenimientoService,
  ]  
})
export class MantenimientoModule { }
