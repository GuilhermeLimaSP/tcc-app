import { ThrowStmt } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

// Custom Imports (Services)
import { AlertsService } from '../services/alerts.service';
import { ApiConnectionService } from '../services/api-connection.service';
import { StorageService } from '../services/storage.service';
import { UtilsService } from '../services/utils.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  email: string;
  password: string;

  constructor(private router: Router,
              private alertService: AlertsService,
              private apiConnection: ApiConnectionService,
              private utils: UtilsService,
              private storage: StorageService) { }

  ngOnInit() {
  }

  login(email: string, password: string){
    // Validações
    if(!this.utils.validation_email(email)){
      this.alertService.showAlert("E-mail inválido", "Por favor, digite um e-mail válido!");
      return;
    }
    if(!password){
      this.alertService.showAlert("Preencha sua senha", "Por favor, digite sua senha!");
      return;
    }

    // Conexão com a API
    this.apiConnection.login(email, password)
      .then((response) => {
        const api_response = JSON.parse(response.data);
        console.log(api_response);

        if(api_response.message == "sucess_login"){
          this.alertService.showAlert("Autenticação completa", "O login foi efetuado com sucesso, bem-vindo!");      
          
          // Resetar campos
          this.email = "";
          this.password = "";

          // Remove o campo 'message' do objeto e guarda os dados
          delete api_response['message'];
          this.storage.setData(api_response);

          // Navegar para página de adoções
          this.goTo('adoption');
        }else{
          this.alertService.showAlert("Erro interno", "Se o problema persistir, contate o suporte.");
        }
      })
      .catch((error) => {
        const api_error = JSON.parse(error.error);
        console.log(api_error);

        if(api_error.message == "not_found"){
          this.alertService.showAlert("Usuário não cadastrado!", "Por favor, verifique o e-mail e tente novamente!");
        }else if(api_error.message == "invalid_authentication"){
          this.alertService.showAlert("Dados incorretos!", "Por favor, verifique o e-mail e senha e tente novamente!");
        }else{
          this.alertService.showAlert("Erro interno", "Se o problema persistir, contate o suporte.");
        }
      });
  }

  changePassword(){
    this.alertService.showAlert("Troca de senha", "Para trocar sua senha entre em contato com o suporte!")
  }
  goTo(page: string){ 
    this.router.navigateByUrl("/" + page);
  }

}
 