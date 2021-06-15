import { Component, OnInit } from '@angular/core';

// Custom Import
import { ApiConnectionService } from '../services/api-connection.service';
import { StorageService } from '../services/storage.service';

@Component({
  selector: 'app-report',
  templateUrl: './report.page.html',
  styleUrls: ['./report.page.scss'],
})
export class ReportPage implements OnInit {
  reports = new Array(); // Variavel de reports
  loading: boolean = true; // Variavel de carregamento
  author_id: any; // Id do usuário

  constructor(private storage: StorageService,
              private apiConnection: ApiConnectionService) { }

  /*  Método: ngOnInit 
      Parâmetros: []
      Objetivo: Dispara eventos ao iniciar a página
  */              
  async ngOnInit() {
    // Obter usuário logado
    const data = await this.storage.getData();
    console.log("Connected userdata:");
    console.log(data);

    // Salvar usuário logado 
    this.author_id = data.id;

    // Atualizar Reports
    this.UpdateList(null);
  }

  /*  Método: ionViewWillEnter 
      Parâmetros: []
      Objetivo: Dispara eventos quando a página está prestes a se tornar ativa
  */
  ionViewWillEnter() {
    // Atualiza os reports da página
    this.UpdateList(null);
  }

  /*  Método: UpdateList 
      Parâmetros: [
        event: evento vindo do html ou nulo caso não haja
      ]
      Objetivo: Atualiza a lista do html com dados novos, caso haja.
  */
  UpdateList(event: any){
    // Ativa os sistemas de carregamento
    if(!this.loading){
      this.loading = true;
    }

    // Faz a chamada a api para obter os reports do usuário
    this.apiConnection.getAllUserReports(this.author_id)
    .then((response)=>{
      this.reports = JSON.parse(response.data);
      console.log(this.reports);

      // Desativa os sistemas de carregamento
      this.loading = false;

      // Completa o evento do IonLoader
      if(event){
        event.target.complete();
      }
    })
    .catch((error)=>{
      console.log(error);  

      // Desativa os sistemas de carregamento
      this.loading = false;

      // Completa o evento do IonLoader
      if(event){
        event.target.complete();
      }
    })
  }

}
