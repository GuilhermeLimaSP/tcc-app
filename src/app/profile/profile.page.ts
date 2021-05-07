import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';

import { ProfileUserPage } from '../profile-user/profile-user.page';
import { UserPasswordPage } from '../user-password/user-password.page';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {

  constructor(public modalController: ModalController) { }

  ngOnInit() {
  }

  async openInfoChange() {
    const modal = await this.modalController.create({
      component: ProfileUserPage
    });
    return await modal.present();
  }
  async openPassword() {
    const modal = await this.modalController.create({
      component: UserPasswordPage
    });
    return await modal.present();
  }
}
