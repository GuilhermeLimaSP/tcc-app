import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { UserPasswordPage } from './user-password.page';

const routes: Routes = [
  {
    path: '',
    component: UserPasswordPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UserPasswordPageRoutingModule {}
