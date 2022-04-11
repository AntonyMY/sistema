import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router'

import { ArticulosComponent } from './pages/articulos/articulos.component';
import { ListadoLineasComponent } from './pages/lineas/listado-lineas.component';
import { ListadoMarcasComponent } from './pages/marcas/listado-marcas.component';

const routes:Routes=[
  {    
    path:'lineas',        
    component:ListadoLineasComponent,    
  },
  {    
    path:'marcas',        
    component:ListadoMarcasComponent,    
  },
  {    
    path:'articulos',        
    component:ArticulosComponent,    
  }
]

@NgModule({  
  imports: [    
    RouterModule.forChild(routes),
  ],
  exports:[
    RouterModule,
  ]
})
export class MantenimientoRoutingModule { }
