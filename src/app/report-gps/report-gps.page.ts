import { Component, OnInit } from '@angular/core';

import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-report-gps',
  templateUrl: './report-gps.page.html',
  styleUrls: ['./report-gps.page.scss'],
})
export class ReportGpsPage implements OnInit {

  constructor(public viewCtrl: ModalController) { }

  ngOnInit() {
  }

  dismiss() {
    this.viewCtrl.dismiss();
  }
}
 