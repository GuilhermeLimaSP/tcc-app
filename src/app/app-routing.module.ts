import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },
  {
    path: 'login', 
    loadChildren: () => import('./login/login.module').then( m => m.LoginPageModule)
  },
  {
    path: 'create-account',
    loadChildren: () => import('./create-account/create-account.module').then( m => m.CreateAccountPageModule)
  },
  {
    path: 'adoption',
    loadChildren: () => import('./adoption/adoption.module').then( m => m.AdoptionPageModule)
  },
  {
    path: 'ong',
    loadChildren: () => import('./ong/ong.module').then( m => m.OngPageModule)
  },
  {
    path: 'report',
    loadChildren: () => import('./report/report.module').then( m => m.ReportPageModule)
  },
  {
    path: 'profile-adoption/:id',
    loadChildren: () => import('./profile-adoption/profile-adoption.module').then( m => m.ProfileAdoptionPageModule)
  },
  {
    path: 'profile-ong/:id',
    loadChildren: () => import('./profile-ong/profile-ong.module').then( m => m.ProfileOngPageModule)
  },
  {
    path: 'view-report/:id',
    loadChildren: () => import('./view-report/view-report.module').then( m => m.ViewReportPageModule)
  },
  {
    path: 'create-report',
    loadChildren: () => import('./create-report/create-report.module').then( m => m.CreateReportPageModule)
  },
  {
    path: 'report-gps',
    loadChildren: () => import('./report-gps/report-gps.module').then( m => m.ReportGpsPageModule)
  },
  {
    path: 'report-address',
    loadChildren: () => import('./report-address/report-address.module').then( m => m.ReportAddressPageModule)
  },
  {
    path: 'profile',
    loadChildren: () => import('./profile/profile.module').then( m => m.ProfilePageModule)
  },
  {
    path: 'profile-user',
    loadChildren: () => import('./profile-user/profile-user.module').then( m => m.ProfileUserPageModule)
  },
  {
    path: 'user-password',
    loadChildren: () => import('./user-password/user-password.module').then( m => m.UserPasswordPageModule)
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
