import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminTopbarComponent } from './admin-topbar/admin-topbar.component';
import { DashboardMainComponent } from './dashboard-main/dashboard-main.component';
import { AuthGuard } from './Guards/auth.guard';
import { LoginComponent } from './login/login.component';
import { ReportsComponent } from './reports/reports.component';
import { ReviewsComponent } from './reviews/reviews.component';
import { StoreOwnerService } from './Services/storeOwner.service';
import { SidebarComponent } from './sidebar/sidebar.component';
import { StoreOwnersComponent } from './storeOwners/storeOwners.component';
import { UsersComponent } from './users/users.component';

const routes: Routes = [
  {path:'login',  component:LoginComponent},
  {
    path: '',
    runGuardsAndResolvers: 'always',
    canActivate: [AuthGuard],
    children: [
      { path:'dashboard',      component:DashboardMainComponent},
      { path:'users',          component:UsersComponent},
      { path:'storeOwners',    component:StoreOwnersComponent},
      { path:'admin-topbar',   component:AdminTopbarComponent},
      { path:'reports',        component:ReportsComponent},
      { path:'reviews',        component:ReviewsComponent},
    ]
},
  
  { path: '**', redirectTo: 'login', pathMatch: 'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
