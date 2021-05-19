import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

// Custom Imports (Services)
import { ApiConnectionService } from '../services/api-connection.service';
import { UtilsService } from '../services/utils.service';
import { AlertsService } from '../services/alerts.service';

@Component({
  selector: 'app-create-account',
  templateUrl: './create-account.page.html',
  styleUrls: ['./create-account.page.scss'],
})
export class CreateAccountPage implements OnInit {

  constructor(private router: Router,
              private utils: UtilsService,
              private apiConnection: ApiConnectionService,
              public alertService: AlertsService) { }

  ngOnInit() {
  }

  createAccount(name: string, email: string, password: string, password2: string, cep: string, phone: string){
    // Validações
    if(!name){
      this.alertService.showAlert("Nome inválido", "Por favor, preencha o campo nome!");
      return;
    }
    if(!this.utils.validation_email(email)){
      this.alertService.showAlert("E-mail inválido", "Por favor, digite um e-mail válido!");
      return;
    }
    if(!password){
      this.alertService.showAlert("Preencha sua senha", "Por favor, digite sua senha!");
      return;
    }
    if(password.length < 6 || password.length > 12){
      this.alertService.showAlert("Senha inválida", "Sua senha deve ter entre 6 e 12 caracteres.");
      return;
    }
    if(password != password2){
      this.alertService.showAlert("Senha inválida", "A confirmação de senha não conferem.");
      return;      
    }
    if(!this.utils.validation_cep(cep)){
      this.alertService.showAlert("Cep inválido", "Por favor, insira um cep válido!");
      return;
    }
    if(!this.utils.validation_phone(phone)){
      this.alertService.showAlert("Telefone inválido", "Insira um número de celular válido!");
      return;
    }

    // Conexão com a API
    this.apiConnection.createAccount(name, email, password, 'default.png', phone, cep.replace('-', ''))
      .then((response) => {
        const api_response = JSON.parse(response.data);
        console.log(api_response);

        if(api_response.message == "sucess_user_created"){
          this.alertService.showAlert("Conta criada", "Sua conta foi criada com sucesso!");      

          // Navegar para página de adoções
          this.goTo('login');
        }else{
          this.alertService.showAlert("Erro interno", "Se o problema persistir, contate o suporte.");
        }
      })
      .catch((error) => {
        const api_error = JSON.parse(error.error);
        console.log(api_error);

        if(api_error.message == "email_already_used"){
          this.alertService.showAlert("E-mail inválido", "O e-mail inserido já está em uso, tente outro e-mail!");
        }else if(api_error.message == "failed_user_creation"){
          this.alertService.showAlert("Erro no servidor", "Se o problema persistir, contate o suporte.");
        }else{
          this.alertService.showAlert("Erro interno", "Se o problema persistir, contate o suporte.");
        }
      });
  }

  goTo(page: string){ 
    this.router.navigateByUrl("/" + page);
  }
}
