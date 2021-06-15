import { Component, OnInit } from '@angular/core';

// Custom Imports
import { ActivatedRoute } from '@angular/router';
import { ApiConnectionService } from '../services/api-connection.service';


@Component({
  selector: 'app-profile-adoption',
  templateUrl: './profile-adoption.page.html',
  styleUrls: ['./profile-adoption.page.scss'],
})
export class ProfileAdoptionPage implements OnInit {
  dataAnimal: any = {};
  dataOng: any = {}; 
  loading: boolean = true;

  constructor(private route : ActivatedRoute,
              private apiConnection: ApiConnectionService) { }

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

}
