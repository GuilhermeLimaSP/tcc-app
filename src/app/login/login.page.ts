import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

// Custom Imports (Services)
import { AlertsService } from '../services/alerts.service';
import { ApiConnectionService } from '../services/api-connection.service';
import { StorageService } from '../services/storage.service';
import { UtilsService } from '../services/utils.service';

// Ionic Import
import { MenuController } from '@ionic/angular';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  email: string;
  password: string;
  ConnectionWithApi = false;

  constructor(private router: Router,
              private alertService: AlertsService,
              private apiConnection: ApiConnectionService,
              private utils: UtilsService,
              private storage: StorageService,
              public menuCtrl: MenuController) { }

  /*  Método: ngOnInit 
      Parâmetros: []
      Objetivo: Dispara eventos ao iniciar a página
  */
  ngOnInit() {
    this.apiConnection.PingApi()
      .then((response) => {
        const api_response = JSON.parse(response.data);
        console.log(api_response);

        if(api_response.message = "pong"){
          this.ConnectionWithApi = true;
        }
      })  
      .catch((error) => {
        console.log(error);
        this.alertService.showAlert("Falha na conexão com os servidores", "Não conseguimos conexão com o servidor, verifique se sua conexão com a rede está ativa e reinicie o aplicativo.");

        this.watchConnection()
      });
    

    // DEBUG ONLY
    this.email = "edu@edu.com";
    this.password = "adminadmin";
  }

  /*  Método: ionViewWillEnter 
      Parâmetros: []
      Objetivo: Dispara eventos quando a página está prestes a se tornar ativa
  */
  ionViewWillEnter() {
    // Desativa o menu para está página
    this.menuCtrl.enable(false);
  }

  /*  Método: watchConnection 
      Parâmetros: []
      Objetivo: Verifica a conexão com o servidor
  */
  watchConnection(){
      // Define um temporizador para verificar a conexão
      var timer = setInterval(() =>{
        console.log("Trying connection with server...")
        
        this.apiConnection.PingApi()
          .then((response) => {
            const api_response = JSON.parse(response.data);
            console.log(api_response);
    
            // Verifica a resposta da API
            if(api_response.message = "pong"){
              this.alertService.showAlert("Conectado aos servidores!", "A conexão foi feita com sucesso, você já pode usar o aplicativo.");
              this.ConnectionWithApi = true;

              // Caso a conexão seja feita com sucesso, desative o temporizador
              clearInterval(timer);
            }
          })  
          .catch(() => {
          });
       }, 3000);
  }

  /*  Método: login 
      Parâmetros: [
        email: e-mail do usuário,
        password: senha do usuário
      ]
      Objetivo: Faz a chamada a API verificando o usuário e senha informado
  */
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
        console.log(response);
        
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
        console.log(error);

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

  /*  Método: changePassword 
      Parâmetros: []
      Objetivo: Abre um modal com uma mensagem
  */
  changePassword(){
    this.alertService.showAlert("Troca de senha", "Para trocar sua senha entre em contato com o suporte!")
  }

  /*  Método: goTo 
      Parâmetros: [
        page: Página para redirecionar
      ]
      Objetivo: Faz a navegação para outra página usando o router
  */ 
  goTo(page: string){ 
    this.router.navigateByUrl("/" + page);
  }

}
 