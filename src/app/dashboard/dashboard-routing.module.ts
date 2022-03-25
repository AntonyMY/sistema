import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router'
import { HomeComponent } from './pages/home/home.component';

const routes:Routes=[  
  {
    path:'home',
    component:HomeComponent,
    children:[     
      {
        path:'',
        loadChildren:()=>import('../ventas/ventas.module').then(m => m.VentasModule)
      },
    ]    
  },
]

@NgModule({  
  imports: [
    RouterModule.forChild(routes)
  ],
  exports:[
    RouterModule,
  ]
})
export class DashboardRoutingModule { }
