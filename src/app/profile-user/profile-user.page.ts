import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

// Custom Import
import { ModalController } from '@ionic/angular';
import { AlertsService } from '../services/alerts.service';
import { ApiConnectionService } from '../services/api-connection.service';
import { StorageService } from '../services/storage.service';
import { UtilsService } from '../services/utils.service';

@Component({
  selector: 'app-profile-user',
  templateUrl: './profile-user.page.html',
  styleUrls: ['./profile-user.page.scss'],
})
export class ProfileUserPage implements OnInit {
  email: string;
  cep: string;
  phone: string;
  storageData: any;

  constructor(public viewCtrl: ModalController,
              public apiConnection: ApiConnectionService,
              public storage: StorageService,
              public alertService: AlertsService,
              private utils: UtilsService,
              private router: Router) { }

  async ngOnInit() {
    this.storageData = await this.storage.getData();

    // Definir os valores já armazenados
    this.email = this.storageData['email'];
    this.cep = this.storageData['cep'];
    this.phone = this.storageData['phone'];
  }

  updateInfos(password: string, new_cep: string, new_phone: string){
    if(this.storageData['cep'] == new_cep && new_phone == this.storageData['phone']){
      this.alertService.showAlert("Nenhuma alteração", "Você deve alterar algo para atualizar seu perfil.");
      return;
    }
    if(!password){
      this.alertService.showAlert("Digite sua senha", "Você deve digitar sua senha atual para validar a operação.");
      return;
    }
    if(!this.utils.validation_cep(new_cep)){
      this.alertService.showAlert("Cep inválido", "Por favor, insira um cep válido!");
      return;
    }
    if(!this.utils.validation_phone(new_phone)){
      this.alertService.showAlert("Telefone inválido", "Insira um número de celular válido!");
      return;
    }

    new_cep = new_cep.replace('-', '');
    this.apiConnection.changeInfos(password, this.storageData['email'], new_cep, new_phone)
      .then((response)=>{
        const api_response = JSON.parse(response.data);
        console.log(api_response);

        if(api_response.message == "successful_change"){
          this.alertService.showAlert("Informações atualizadas", "Você precisará fazer login novamente.");    
          this.storage.removeData();
          this.dismiss();
          this.goTo('login');
        }else{
          this.alertService.showAlert("Erro interno", "Se o problema persistir, contate o suporte.");
        }
      })
      .catch((error)=>{
        const api_error = JSON.parse(error.error);
        console.log(api_error);

        if(api_error.message == "invalid_authentication"){
          this.alertService.showAlert("Senha inválida", "Digite novamente a senha atual de sua conta.");
        }else if(api_error.message == "not_found"){
          this.alertService.showAlert("Conta não localizada", "O servidor não encontrou sua conta, tente fazer login novamente.");
        }else{
          this.alertService.showAlert("Erro interno", "Se o problema persistir, contate o suporte.");
        }
      })
  }

  dismiss() {
    this.viewCtrl.dismiss();
  }
  goTo(page: string){ 
    this.router.navigateByUrl("/" + page);
  }
}
  