import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NotFoundComponent } from './shared/pages/not-found/not-found.component';

const routes: Routes = [
  {
    path:'',
    loadChildren:()=>import('./dashboard/dashboard.module').then(m => m.DashboardModule)
  },
  {
    path:'',
    loadChildren:()=>import('./ventas/ventas.module').then(m => m.VentasModule)
  },
  {
    path:'404',
    component:NotFoundComponent
  },
  {
    path:'**',
    redirectTo:'404'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
