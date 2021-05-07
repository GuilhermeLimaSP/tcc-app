import { Component, OnInit } from '@angular/core';

import { ModalController } from '@ionic/angular';

import { ReportAddressPage } from '../report-address/report-address.page';
import { ReportGpsPage } from '../report-gps/report-gps.page';

// import { ReportGpsPageModule } from '../report-gps/report-gps.module';
// import { ReportAddressPageModule } from '../report-address/report-address.module';

@Component({
  selector: 'app-create-report',
  templateUrl: './create-report.page.html',
  styleUrls: ['./create-report.page.scss'],
})
export class CreateReportPage implements OnInit {

  constructor(public modalController: ModalController) { }

  ngOnInit() {
  }

  async openGps() {
    const modal = await this.modalController.create({
    component: ReportGpsPage
    });
    return await modal.present();
  }
  async openAddress() {
    const modal = await this.modalController.create({
    component: ReportAddressPage
    });
    return await modal.present();
  }

} 
 