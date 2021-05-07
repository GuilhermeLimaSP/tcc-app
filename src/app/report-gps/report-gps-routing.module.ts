import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ReportGpsPage } from './report-gps.page';

const routes: Routes = [
  {
    path: '',
    component: ReportGpsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ReportGpsPageRoutingModule {}
