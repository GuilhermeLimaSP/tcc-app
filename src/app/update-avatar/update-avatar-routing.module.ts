import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { UpdateAvatarPage } from './update-avatar.page';

const routes: Routes = [
  {
    path: '',
    component: UpdateAvatarPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UpdateAvatarPageRoutingModule {}
