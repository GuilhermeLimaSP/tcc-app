import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';


@Component({
  selector: 'app-user-password',
  templateUrl: './user-password.page.html',
  styleUrls: ['./user-password.page.scss'],
})
export class UserPasswordPage implements OnInit {

  constructor(public viewCtrl: ModalController) { }

  ngOnInit() {
  }
  dismiss() {
    this.viewCtrl.dismiss();
  }

}
