import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ReportAddressPageRoutingModule } from './report-address-routing.module';

import { ReportAddressPage } from './report-address.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ReportAddressPageRoutingModule
  ],
  declarations: [ReportAddressPage]
})
export class ReportAddressPageModule {}
