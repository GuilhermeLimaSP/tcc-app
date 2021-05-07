import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ProfileOngPage } from './profile-ong.page';

const routes: Routes = [
  {
    path: '',
    component: ProfileOngPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ProfileOngPageRoutingModule {}
