import { NgModule }         from '@angular/core';
import { CommonModule }     from '@angular/common';
import { FormsModule }      from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { PrimeNGModule }    from '../prime-ng/prime-ng.module';
import { MessageService }   from 'primeng/api';

import { MantenimientoRoutingModule } from './mantenimiento-routing.module';

import { ArticulosComponent } from './pages/articulos/articulos.component';

import { ListadoLineasComponent } from './pages/lineas/listado-lineas.component';
import { LineaService }     from './services/linea.service';
import { FormLineaComponent } from './pages/lineas/form-linea.component';

import { ListadoMarcasComponent } from './pages/marcas/listado-marcas.component';
import { FormMarcasComponent } from './pages/marcas/form-marcas.component';
import { MarcaService }     from './services/marca.service';

import { ListadoGrupoConceptosComponent } from './pages/grupoconceptos/listado-grupo-conceptos.component';

@NgModule({
  declarations: [
    ListadoLineasComponent,
    ArticulosComponent,
    FormLineaComponent,
    FormMarcasComponent,
    ListadoMarcasComponent,
    ListadoGrupoConceptosComponent
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
    MarcaService
  ]  
})
export class MantenimientoModule { }
