import { Component, OnInit } from '@angular/core';

// Custom Imports
import { ModalController } from '@ionic/angular';
import { ApiConnectionService } from '../services/api-connection.service';
import { StorageService } from '../services/storage.service';
import { UtilsService } from '../services/utils.service';

// Pages for modal
import { ProfileUserPage } from '../profile-user/profile-user.page';
import { UserPasswordPage } from '../user-password/user-password.page';
import { UpdateAvatarPage } from '../update-avatar/update-avatar.page';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage{
  loading: boolean = true;
  data: Object;
  date_user: any;

  constructor(public modalController: ModalController,
              public storage: StorageService, 
              public apiConnection: ApiConnectionService,
              public utils: UtilsService) { }

  /*  Método: ionViewWillEnter 
      Parâmetros: []
      Objetivo: Dispara eventos quando o usuário entra na página
  */             
  async ionViewWillEnter() {
    // Obtem dados do Storage
    this.data = await this.storage.getData();
    console.log(this.data, typeof(this.data));

    // Desativa o loader e salva a data revertendo ela para o padrão PT-BR
    this.loading = false;
    this.date_user = this.utils.revertDate(this.data['created_at']);
  }

  /*  Método: openInfoChange 
      Parâmetros: []
      Objetivo: Abre o modal de mudança de informações
  */ 
  async openInfoChange() {
    const modal = await this.modalController.create({
      component: ProfileUserPage
    });
    return await modal.present();
  }

  /*  Método: openAvatarModal 
      Parâmetros: []
      Objetivo: Abre o modal de mudança de avatar
  */ 
  async openAvatarModal() {
    const modal = await this.modalController.create({
      component: UpdateAvatarPage
    });
    return await modal.present();
  }

  /*  Método: openPassword 
      Parâmetros: []
      Objetivo: Abre o modal de mudança de senha
  */ 
  async openPassword() {
    const modal = await this.modalController.create({
      component: UserPasswordPage
    });
    return await modal.present();
  }
}
 