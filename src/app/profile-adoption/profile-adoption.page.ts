import { Component, OnInit } from '@angular/core';

// Custom Imports
import { ActivatedRoute } from '@angular/router';
import { ApiConnectionService } from '../services/api-connection.service';
import { PhotoViewer } from '@ionic-native/photo-viewer/ngx';

@Component({
  selector: 'app-profile-adoption',
  templateUrl: './profile-adoption.page.html',
  styleUrls: ['./profile-adoption.page.scss'],
})
export class ProfileAdoptionPage implements OnInit {
  dataAnimal: any = {};
  dataOng: any = {}; 
  loading: boolean = true;
  animal_category: string;
  animal_gender: string;

  constructor(private route : ActivatedRoute,
              private apiConnection: ApiConnectionService,
              private photoViewer: PhotoViewer) { }

  /*  Método: ngOnInit 
      Parâmetros: []
      Objetivo: Dispara eventos ao iniciar a página
  */
  ngOnInit() { 
    // Get Id
    const id = this.route.snapshot.params.id;
    console.log(`Id of animal: ${id}`);

    // Obtém os animais através da API
    this.apiConnection.getAnimal(id)
    .then((response)=>{
      // Salva os dados do animal
      this.dataAnimal = JSON.parse(response.data);
      console.log(this.dataAnimal);

      // Caso consiga pegar o animal, também é necessário pegar informações da ong
      // Então fazemos outra requisição a API dentro do THEN da primeira requisição
      this.apiConnection.getOng(this.dataAnimal.ong_id)
      .then((response)=>{
        // Salva os dados da ONG
        this.dataOng = JSON.parse(response.data);
        console.log(this.dataOng);
        
        // Tradução de algumas palavras
        this.animal_gender = this.dataAnimal['animal_gender'] = 'male' ? "Masculino" : "Femenino";
        if(this.dataAnimal['animal_category'] == 'small'){
          this.animal_category = "Pequeno";
        }else if(this.dataAnimal['average'] == 'small'){
          this.animal_category = "Médio";
        }else{
          this.animal_category = "Grande";
        }
        
        // disable loading bar && set intentional delay
        setTimeout(()=>{
          this.loading = false;
        }, 500)
      })
      .catch((error)=>{
        // Em caso de erro ao obter informações da ONG
        const api_error = JSON.parse(error.error);
        console.log(api_error);       
      })
    })
    .catch((error)=>{
      // Em caso de erro ao obter informações do animal
      const api_error = JSON.parse(error.error);
      console.log(api_error);       
    });
  }

  /*  Método: imgFullscreen 
      Parâmetros: [
        url: Url da imagem
        name: Nome que será exibido embaixo
      ]
      Objetivo: Abre a imagem em tela cheia
  */
  imgFullscreen(url: string, name: string){
    this.photoViewer.show(url, name)
  }

}
