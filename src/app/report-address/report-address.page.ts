import { Component, OnInit } from '@angular/core';

import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-report-address',
  templateUrl: './report-address.page.html',
  styleUrls: ['./report-address.page.scss'],
})
export class ReportAddressPage implements OnInit {

  constructor(public viewCtrl: ModalController) { }

  ngOnInit() {
  }

  dismiss() {
    this.viewCtrl.dismiss();
  }
}
 