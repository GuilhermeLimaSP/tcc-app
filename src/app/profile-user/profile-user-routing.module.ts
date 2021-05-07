import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ProfileUserPage } from './profile-user.page';

const routes: Routes = [
  {
    path: '',
    component: ProfileUserPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ProfileUserPageRoutingModule {}
