import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ProfileAdoptionPage } from './profile-adoption.page';

const routes: Routes = [
  {
    path: '',
    component: ProfileAdoptionPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ProfileAdoptionPageRoutingModule {}
