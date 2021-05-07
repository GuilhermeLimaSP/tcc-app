import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CreateReportPage } from './create-report.page';

const routes: Routes = [
  {
    path: '',
    component: CreateReportPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CreateReportPageRoutingModule {}
