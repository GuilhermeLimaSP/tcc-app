import { Component, OnInit } from '@angular/core';

// Custom Imports
import { ModalController } from '@ionic/angular';
import { ProfileUserPage } from '../profile-user/profile-user.page';
import { ApiConnectionService } from '../services/api-connection.service';
import { StorageService } from '../services/storage.service';
import { UserPasswordPage } from '../user-password/user-password.page';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {
  loading: boolean =true;
  data: Object;

  constructor(public modalController: ModalController,
              public storage: StorageService, 
              public apiConnection: ApiConnectionService) { }

  async ngOnInit() {
    this.data = await this.storage.getData();
    console.log(this.data, typeof(this.data));

    this.loading = false;
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
 