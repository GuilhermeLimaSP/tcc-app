import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-profile-user',
  templateUrl: './profile-user.page.html',
  styleUrls: ['./profile-user.page.scss'],
})
export class ProfileUserPage implements OnInit {

  constructor(public viewCtrl: ModalController) { }

  ngOnInit() {
  }
  dismiss() {
    this.viewCtrl.dismiss();
  }
}
 