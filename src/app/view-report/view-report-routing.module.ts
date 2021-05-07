import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ViewReportPage } from './view-report.page';

const routes: Routes = [
  {
    path: '',
    component: ViewReportPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ViewReportPageRoutingModule {}
