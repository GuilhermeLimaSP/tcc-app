import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ViewReportPageRoutingModule } from './view-report-routing.module';

import { ViewReportPage } from './view-report.page';

// Custom Imports
import { PhotoViewer } from '@ionic-native/photo-viewer/ngx';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ViewReportPageRoutingModule
  ],
  declarations: [ViewReportPage],
  providers: [PhotoViewer]
})
export class ViewReportPageModule {}
