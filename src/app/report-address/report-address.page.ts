import { Component, OnInit } from '@angular/core';

// Imports
import { LoadingController, ModalController } from '@ionic/angular';
import { NativeGeocoder, NativeGeocoderResult, NativeGeocoderOptions } from '@ionic-native/native-geocoder/ngx';

// Declarar uma variavel global 
declare var google: any;

@Component({
  selector: 'app-report-address',
  templateUrl: './report-address.page.html',
  styleUrls: ['./report-address.page.scss'],
})
export class ReportAddressPage implements OnInit {
  address_name: string;
  GoogleAutocomplete: any;
  autocompleteItems: any[] = [];

  constructor(public viewCtrl: ModalController,
              public nativeGeocoder: NativeGeocoder,
              public loadingController: LoadingController)
  { 
    this.GoogleAutocomplete = new google.maps.places.AutocompleteService();
  }

  /*  Método: ngOnInit 
      Parâmetros: []
      Objetivo: Dispara eventos ao iniciar a página
  */
  ngOnInit() {
  }

  /*  Método: updateSearchResults 
      Parâmetros: []
      Objetivo: É chamado toda vez que algo é digitado no campo de rua, solicitando e atualizando as previsões de ruas, usando a API do Google Maps
  */
  updateSearchResults(){ 
    // Caso não haja texto no input, não prossiga 
    if(!this.address_name){
      return;
    }

    // Debug
    console.log(`Searching as: ${this.address_name}`);

    // Prepara o pacote com o texto do input e outras restrições
    const requestData = { 
      'input': this.address_name, 
      'componentRestrictions': {
        'country': 'br', // define apenas endereços brasileiros
      }
    }; 
                      
    // Chama GoogleAutocomplete para pegar as previsões
    this.GoogleAutocomplete.getPlacePredictions(requestData, (predictions: any, status: any) => {
      // Este é o array que recebe as previsões
      this.autocompleteItems = [];

      // Percorrendo todas as previsões e armazenando
      if(predictions?.length > 0 ){
        predictions.map((item) => {
          this.autocompleteItems.push(item);
        })
      }
    });

    // Debug
    console.log(this.autocompleteItems);
  }

  
  /*  Método: SelectSearchResult 
      Parâmetros: [
        item: um objetivo com todas as informações da rua
      ]
      Objetivo: É chamado quando um usuário clica num previsão, tem como objetivo pegar as informações do NativeGeocoder (ionic) com base no nome da rua e retornar as informações para página de reports;
      Observações: O objeto item já tem algumas informações úteis, mas não tem o POSTAL CODE, sendo assim, prefiro converter o nome da rua em latitude e longitude e depois converte isto novamente para um objeto com informações da rua, utilizando o nativegeocoder que vai sempre retornar o CEP.
  */
  async SelectSearchResult(item: any){
    // Criar o Loader
    const loading = await this.loadingController.create({
      message: 'Aguarde...',
      spinner: 'dots'
    });
    await loading.present();

    // Pega todo o nome da rua
    const full_address = item['description'];
    console.log("Adress is ", full_address);

    // Converte o nome da rua em Latitude e longitude - RETORNO: Latitude, longitude
    const response = await this.GetLatLng(full_address);

    // Objeto de configurações do NativeGeocoder
    let options: NativeGeocoderOptions = {
      useLocale: true,
      maxResults: 1
    };

    /// Variavel que receberá os dados
    var adress_data = {};

    // Converte latitude e longitude em um objeto com informações sobre o endereço
    await this.nativeGeocoder.reverseGeocode(response[0], response[1], options) // response é um array que retorna [latitude, longitude]
      .then((result: NativeGeocoderResult[]) => {
        adress_data = result[0];
      })
      .catch((error: any) => console.log(error));

    // Remover Loader
    loading.dismiss();

    // Volta para página de reports enviando informações sobre o endereço
    this.viewCtrl.dismiss(adress_data);
  }

  /*  Método: GetLatLng 
    Parâmetros: [
      address: um nome de rua
    ]
    Objetivo: Converte um endereço em latitude e longitude
  */
  async GetLatLng(address: string){
    // Objeto de configurações do NativeGeocoder
    let options: NativeGeocoderOptions = {
      useLocale: true,
      maxResults: 1
    };

    // Define as variaveis de latitude e longitude
    var lat: any, longi: any;

    // Converte o endereço em latitude e longitude atráves do Native Geocoder
    await this.nativeGeocoder.forwardGeocode(address, options)
      .then((result: NativeGeocoderResult[]) => {
        lat = result[0].latitude;
        longi = result[0].longitude;

        console.log('The coordinates are latitude=' + result[0].latitude + ' and longitude=' + result[0].longitude);
      })
      .catch((error: any) => console.log(error));

    return [lat, longi];
  }

  /*  Método: dismiss 
    Parâmetros: []
    Objetivo: Fecha a view do modal;
  */
  dismiss() {
    this.viewCtrl.dismiss();
  }
}
 