import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { PrimeNGModule } from '../prime-ng/prime-ng.module';
import { MantenimientoRoutingModule } from './mantenimiento-routing.module';
import { ListadoLineasComponent } from './pages/lineas/listado-lineas.component';
import { LineaService } from './services/linea.service';
import { ArticulosComponent } from './pages/articulos/articulos.component';
import { MessageService } from 'primeng/api';
import { FormLineaComponent } from './pages/lineas/form-linea.component';

@NgModule({
  declarations: [
    ListadoLineasComponent,
    ArticulosComponent,
    FormLineaComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    HttpClientModule,

    PrimeNGModule,
    MantenimientoRoutingModule,
  ],
  providers:[
    LineaService,
    MessageService,
  ]  
})
export class MantenimientoModule { }
