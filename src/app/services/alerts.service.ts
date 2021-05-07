import { Injectable } from '@angular/core';
import { AlertController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class AlertsService {

  constructor(public alertController: AlertController) { }

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
