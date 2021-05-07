import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CreateReportPageRoutingModule } from './create-report-routing.module';
import { CreateReportPage } from './create-report.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CreateReportPageRoutingModule
  ],
  declarations: [CreateReportPage]
})
export class CreateReportPageModule {}
