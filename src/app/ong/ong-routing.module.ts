import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { OngPage } from './ong.page';

const routes: Routes = [
  {
    path: '',
    component: OngPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class OngPageRoutingModule {}
