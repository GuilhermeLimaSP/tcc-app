import { Component, OnInit } from '@angular/core';

// Custom Imports
import { ModalController } from '@ionic/angular';
import { AlertsService } from '../services/alerts.service';
import { ApiConnectionService } from '../services/api-connection.service';
import { StorageService } from '../services/storage.service';

@Component({
  selector: 'app-user-password',
  templateUrl: './user-password.page.html',
  styleUrls: ['./user-password.page.scss'],
})
export class UserPasswordPage implements OnInit {

  constructor(public viewCtrl: ModalController,
              public apiConnection: ApiConnectionService,
              public storage: StorageService,
              public alertService: AlertsService) { }

  ngOnInit() {
  }

  async changePwd(current_pwd: string, new_pwd: string, confirm_new_pwd: string){
    if(!current_pwd || !new_pwd || !confirm_new_pwd){
      this.alertService.showAlert("Preencha todos os campos", "Por favor, preencha todos os campos!");
      return;
    }
    if(new_pwd.length < 6 || new_pwd.length > 12){
      this.alertService.showAlert("Senha inválida", "Sua senha deve ter entre 6 e 12 caracteres.");
      return;
    }
    if(new_pwd != confirm_new_pwd){
      this.alertService.showAlert("Senha inválida", "A confirmação de senha não conferem.");
      return;      
    }
    if(new_pwd == current_pwd){
      this.alertService.showAlert("Senhas iguais", "Sua senha nova deve ser diferente da senha atual.");
      return;
    }

    const storageData = await this.storage.getData();
    const email = storageData['email'];

    this.apiConnection.changePassword(email, current_pwd, new_pwd)
      .then((response)=>{
        const api_response = JSON.parse(response.data);
        console.log(response);
        
        if(api_response.message == "successful_change"){
          this.alertService.showAlert("Sucesso!", "Sua senha foi alterada com sucesso!");
          this.dismiss();
        }
      })
      .catch((error)=>{
        const api_error = JSON.parse(error.error);
        console.log(api_error);

        if(api_error.message == "invalid_authentication"){
          this.alertService.showAlert("Dados incorretos!", "Por favor, verifique a sua senha atual e tente novamente!");
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

}
