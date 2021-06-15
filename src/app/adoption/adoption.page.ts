import { Component, OnInit } from '@angular/core';

// Custom Imports (Services)
import { StorageService } from '../services/storage.service';
import { ApiConnectionService } from '../services/api-connection.service';

// Ionic Import
import { MenuController } from '@ionic/angular';

@Component({
  selector: 'app-adoption',
  templateUrl: './adoption.page.html',
  styleUrls: ['./adoption.page.scss'],
})

export class AdoptionPage implements OnInit {
  animals = new Array(); // Array de animais
  loading: boolean = true; // Variavel de carregando

  constructor(private storage: StorageService,
              private apiConnection: ApiConnectionService,
              public menuCtrl: MenuController) {
   }

  /*  Método: ngOnInit 
      Parâmetros: []
      Objetivo: Dispara eventos ao iniciar a página
  */
  async ngOnInit() {
    // Pega dados do usuário logado
    const data = await this.storage.getData();
    console.log("Connected userdata:");
    console.log(data);

    // Obtem os animais da API
    this.apiConnection.getAnimals()
      .then((response)=>{
        this.animals = JSON.parse(response.data);
        console.log(this.animals);

        // Desativa a variavel de carregando
        this.loading = false;
      })
      .catch((error)=>{
        const api_error = JSON.parse(error.error);
        console.log(api_error);       
      })
  }

  /*  Método: ionViewWillEnter 
      Parâmetros: []
      Objetivo: Dispara eventos quando a página está prestes a se tornar ativa
  */
      ionViewWillEnter() {
        // Desativa o menu para está página
        this.menuCtrl.enable(true);
      }
}
  