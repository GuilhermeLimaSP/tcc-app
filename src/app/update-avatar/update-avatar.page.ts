import { Component, OnInit } from '@angular/core';

// Custom Import 
import { ActionSheetController, ModalController } from '@ionic/angular';
import { Camera, CameraOptions } from '@ionic-native/Camera/ngx';
import { File } from '@ionic-native/file/ngx';
import { Router } from '@angular/router';

// Services
import { AlertsService } from '../services/alerts.service';
import { ApiConnectionService } from '../services/api-connection.service';
import { StorageService } from '../services/storage.service';

@Component({
  selector: 'app-update-avatar',
  templateUrl: './update-avatar.page.html',
  styleUrls: ['./update-avatar.page.scss'],
})
export class UpdateAvatarPage implements OnInit {
  email: string;
  profilePic: string;
  storageData: any;

  userImage = "";
  changedImage = false;
  isLoading = false;

  // Objeto de configuração da câmera
  imagePickerOptions = {
    maximumImagesCount: 1,
    quality: 50
  };

  constructor(public viewCtrl: ModalController,
              public apiConnection: ApiConnectionService,
              public storage: StorageService,
              public alertService: AlertsService,
              private router: Router,
              private camera: Camera,
              public actionSheetController: ActionSheetController,
              private file: File) { }

  /*  Método: ngOnInit 
      Parâmetros: []
      Objetivo: Dispara eventos ao iniciar a página
  */
  async ngOnInit() {
    this.storageData = await this.storage.getData();

    // Definir os valores já armazenados
    this.email = this.storageData['email'];
    this.userImage = this.apiConnection.baseImagePath + this.storageData['img'];
  }
     
  /*  Método: pickImage 
      Parâmetros: [
        sourceType: Origem da imagem (Camera ou biblioteca)
      ]
      Objetivo: Dispara eventos ao iniciar a página
  */
  pickImage(sourceType: any) {
    // Objeto de configuração da câmera
    const options: CameraOptions = {
      quality: 100,
      sourceType: sourceType,
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE
    }

    // Usa o plugin câmera para tirar uma foto ou selecionar da galeria
    this.camera.getPicture(options).then((imageData) => {
      this.changedImage = true;
      this.userImage = 'data:image/jpeg;base64,' + imageData;

      console.log(this.userImage);
    },(err) => {
      console.log(err);
    });
  }

  /*  Método: selectImage 
      Parâmetros: []
      Objetivo: Abre um menu(actionSheetController) para que o usuário escolha qual fonte da imagem
  */
  async selectImage() {
    const actionSheet = await this.actionSheetController.create({
      header: "Selecione a fonte:",
      buttons: [
        {
        text: 'Da minha galeria',
          handler: () => {
            this.pickImage(this.camera.PictureSourceType.PHOTOLIBRARY);
          }
        },
        {
          text: 'Usar a câmera',
          handler: () => {
            this.pickImage(this.camera.PictureSourceType.CAMERA);
          }
        },
        {
          text: 'Cancelar',
          role: 'cancel'
        }
      ]
    });

    // Exibe o menu
    await actionSheet.present();
  }

  /*  Método: updateAvatar 
      Parâmetros: [
        password: Senha do usuário
      ]
      Objetivo: Valida as informações e chama a API para mudar a foto de perfil do usuário
  */
  updateAvatar(password: string){
    // Validação
    if(!password){
      this.alertService.showAlert("Preencha sua senha", "Você precisa preencher o campo de senha.");
      return;
    }
    if(!this.changedImage){
      this.alertService.showAlert("Imagem não atualizada", "Por favor, atualize a sua imagem clicando na imagem atual.");
      return;
    }

    // Chama a API
    this.apiConnection.updateAvatar(this.email, password, this.userImage.replace("data:image/jpeg;base64", ""))
      .then((response) => {
        const api_response = JSON.parse(response.data);
        console.log(api_response);

        // Verifica a resposta
        if(api_response.message == "successful_change"){
          this.alertService.showAlert("Informações atualizadas", "Você precisará fazer login novamente.");    
          this.storage.removeData();
          this.dismiss();
          this.goTo('login');
        }else{
          this.alertService.showAlert("Erro interno", "Se o problema persistir, contate o suporte.");
        }
      })
      .catch((error) => {
        const api_error = JSON.parse(error.error);
        console.log(api_error);

        // Verifica a resposta
        if(api_error.message == "invalid_authentication"){
          this.alertService.showAlert("Senha inválida", "Digite novamente a senha atual de sua conta.");
        }else if(api_error.message == "not_found"){
          this.alertService.showAlert("Conta não localizada", "O servidor não encontrou sua conta, tente fazer login novamente.");
        }else{
          this.alertService.showAlert("Erro interno", "Se o problema persistir, contate o suporte.");
        }
      })
  }

  /*  Método: dismiss 
    Parâmetros: []
    Objetivo: Fecha a view do modal;
  */
  dismiss() {
    this.viewCtrl.dismiss();
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
