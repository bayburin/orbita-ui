import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthCenterGuard } from 'auth-center';

import { SidenavComponent } from './components/sidenav/sidenav.component';

const routes: Routes = [
  {
    path: '',
    component: SidenavComponent,
    canActivate: [AuthCenterGuard],
    children: [
      {
        path: '',
        redirectTo: 'dashboard',
        pathMatch: 'full'
      },
      {
        path: 'dashboard',
        loadChildren: () => import('../modules/dashboard/dashboard.module').then(m => m.DashboardModule)
      },
      {
        path: 'claims',
        loadChildren: () => import('../modules/claim/claim.module').then(m => m.ClaimModule)
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CoreRoutingModule { }
