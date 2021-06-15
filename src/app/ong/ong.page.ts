import { Component, OnInit } from '@angular/core';

// Custom Import
import { ApiConnectionService } from '../services/api-connection.service';

@Component({
  selector: 'app-ong',
  templateUrl: './ong.page.html',
  styleUrls: ['./ong.page.scss'],
})
export class OngPage implements OnInit {
  ongs = new Array();
  loading: boolean = true;

  constructor(private apiConnection: ApiConnectionService) { }

  /*  Método: ngOnInit 
      Parâmetros: []
      Objetivo: Dispara eventos ao iniciar a página
  */
  ngOnInit() {
    this.UpdateList(null);
  }

  /*  Método: UpdateList 
      Parâmetros: [
        event: evento vindo do html ou nulo caso não haja
      ]
      Objetivo: Atualiza a lista do html com dados novos, caso haja.
  */
  UpdateList(event: any){
    if(!this.loading){
      this.loading = true;
    }

    // Obtem as ONGs da API
    this.apiConnection.getOngs()
    .then((response)=>{
      this.ongs = JSON.parse(response.data);
      console.log(this.ongs);

      // Desativa a variavel de carregando
      this.loading = false;

      // Completa o evento do IonLoader
      if(event){
        event.target.complete();
      }
    })
    .catch((error)=>{
      const api_error = JSON.parse(error.error);
      console.log(api_error);      
    
      // Completa o evento do IonLoader
      if(event){
        event.target.complete();
      }
    })
  }
    
}
