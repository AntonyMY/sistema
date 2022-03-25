import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { VentaListaComponent } from './page/lista/venta-lista.component';

const routes:Routes=[
  {
    path:'ventas',
    component:VentaListaComponent,
  }
]

@NgModule({  
  imports: [
    RouterModule.forChild(routes)
  ],
  exports:[
    RouterModule
  ]  
})
export class VentasRoutingModule { }
