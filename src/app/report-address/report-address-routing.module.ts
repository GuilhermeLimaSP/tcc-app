import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ReportAddressPage } from './report-address.page';

const routes: Routes = [
  {
    path: '',
    component: ReportAddressPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ReportAddressPageRoutingModule {}
