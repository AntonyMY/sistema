import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { Lista2Component } from './page/lista2/lista2.component';

const routes:Routes=[
  {
    path:'ventas',
    component:Lista2Component,
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
