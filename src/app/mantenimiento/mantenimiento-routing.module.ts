import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router'
import { ArticulosComponent } from './pages/articulos/articulos.component';
import { LineasComponent } from './pages/lineas/lineas.component';

const routes:Routes=[
  {    
    path:'lineas',        
    component:LineasComponent,    
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
