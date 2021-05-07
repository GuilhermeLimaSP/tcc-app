import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ReportGpsPageRoutingModule } from './report-gps-routing.module';

import { ReportGpsPage } from './report-gps.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ReportGpsPageRoutingModule
  ],
  declarations: [ReportGpsPage]
})
export class ReportGpsPageModule {}
