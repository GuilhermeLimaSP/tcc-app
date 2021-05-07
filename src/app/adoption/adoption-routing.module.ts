import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AdoptionPage } from './adoption.page';

const routes: Routes = [
  {
    path: '',
    component: AdoptionPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdoptionPageRoutingModule {}
