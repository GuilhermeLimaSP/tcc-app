import { Injectable } from '@angular/core';
import { AlertController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class AlertsService {

  constructor(public alertController: AlertController) { }

  /*  Método: showAlert 
      Parâmetros: [
        title: Title do alert
        message: Mensagem do Alert
      ]
      Objetivo: Exibe um alerta na tela do usuário com titulo de mensagem personalizados
  */
  showAlert(title: string, message: string){
    this.alertController.create({
      header: title,
      message: message,
      buttons: ['OK']
    }).then(res => {
      res.present();
    });    
  }
}
