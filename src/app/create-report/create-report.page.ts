import { Component, OnInit } from '@angular/core';

// Ionic Native Components
import { LoadingController, ModalController } from '@ionic/angular';

// Ionic Plugins
import { Geolocation, GeolocationOptions } from '@ionic-native/geolocation/ngx';
import { NativeGeocoder, NativeGeocoderResult, NativeGeocoderOptions } from '@ionic-native/native-geocoder/ngx';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';

// Import page to redirect
import { ReportAddressPage } from '../report-address/report-address.page';

// Serviços
import { AlertsService } from '../services/alerts.service';
import { ApiConnectionService } from '../services/api-connection.service';
import { Router } from '@angular/router';
import { StorageService } from '../services/storage.service';

@Component({
  selector: 'app-create-report',
  templateUrl: './create-report.page.html',
  styleUrls: ['./create-report.page.scss'],
})
export class CreateReportPage implements OnInit {
  location_cep: any;
  location_address: any;
  location_district: any;
  location_state: any;
  author_id: Number;

  latitude: any = 0;
  longitude: any = 0;
  loading: any;

  photo_animal = "assets/img/missing_photo.png";
  photo_reference = "assets/img/missing_photo.png";

  gpsLoading = false;
  submit_button_text = "Enviar";

  constructor(public modalController: ModalController,
              public loadingController: LoadingController,
              private geolocation: Geolocation,
              public alertService: AlertsService,
              private nativeGeocoder: NativeGeocoder,
              private camera: Camera,
              private apiConnection: ApiConnectionService,
              private router: Router,
              private storage: StorageService) { }

  async ngOnInit() {
    // Get logged user
    const data = await this.storage.getData();
    console.log("Connected userdata:");
    console.log(data);

    // Set Id
    this.author_id = data.id;

    console.log(this.author_id);
  }

  // Função responsável por rodar a sequência de GPS para obter o endereço
  async runGps() {
    console.log("Running gps...")

    // Prevent Double Click
    this.gpsLoading = true;

    // Criar loader 
    this.loading = await this.loadingController.create({
      message: 'Carregando sua localização...',
      spinner: 'dots'
    });
    await this.loading.present();

    // Configuração do GPS
    const optionsGps: GeolocationOptions = { 
      maximumAge: 3000, 
      timeout: 5000, 
      enableHighAccuracy: true 
    };

    // Obter localização em latitude e longitude
    await this.geolocation.getCurrentPosition(optionsGps).then((resp) => {
        this.latitude = resp.coords.latitude;
        this.longitude = resp.coords.longitude;

        console.log(`I can get the data! Lat: ${this.latitude} Longi: ${this.longitude}`);
     }).catch((error) => {
      console.log(`[Def runGps] (ERR) ${error}`)
       this.alertService.showAlert("Ocorreu um erro", "Por favor, verifique se seu GPS está ligado, se o aplicativo tem permissão e caso não tenha sucesso, tente outro modo de obter a sua localização!");
      
       // Remover Loader
      this.loading.dismiss();
    });

    if(this.latitude != 0 && this.longitude != 0){
     // Converter para endereço
     const data = await this.TransformLatLongToAdress(this.latitude, this.longitude);
     console.log(data);

     this.FillFields(data);

     // Remover Loader
     await this.loading.dismiss();
    }

    // Prevent Double Click
    this.gpsLoading = false;
  }

  // Transforma Latitude e Longitude em um endereço completo
  async TransformLatLongToAdress(lat: any, long: any){
    var data = undefined;

    let options: NativeGeocoderOptions = {
        useLocale: true,
        maxResults: 1
    };
    
    await this.nativeGeocoder.reverseGeocode(lat, long, options)
      .then((result: NativeGeocoderResult[]) => {
        data = result[0];
      })
      .catch((error: any) => {
        console.log(`[Def TransformLatLongToAdress] (ERR) ${error}`)
        this.alertService.showAlert("Erro interno", "Por favor, tente novamente em alguns segundos. Caso o erro persista, tente buscar o endereço por outro método.");
       
        // Remover Loader
        this.loading.dismiss();
      });      

      return data;
  }

  // Prenche os campos
  FillFields(data: any){
    if(data['postalCode'] != "" && data['thoroughfare'] != "" && data['subThoroughfare'] != "" && data['subLocality'] != "" && data['administrativeArea'] != ""){
      // Preencher informações
      this.location_cep = data['postalCode'];
      this.location_address = data['thoroughfare'];
      this.location_district = data['subLocality'];
      this.location_state = data['administrativeArea'];
   }else{
      this.alertService.showAlert("Erro interno", "Ocorreu um erro interno, tente novamente!")
      console.log(`[Def FillFields] (ERR) Propriedades do objeto incompletas.`)
   }
  }

  takePhoto(ref: any){
    const options: CameraOptions = {
      quality: 80,
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE
    }
    
    console.log(ref.id);
    this.camera.getPicture(options).then((imageData) => {
      let base64Image = 'data:image/jpeg;base64,' + imageData;

      if(ref.id.includes('photo_animal')){
        this.photo_animal = base64Image;
      }else{
        this.photo_reference = base64Image;
      }
    },(err) => {
      this.alertService.showAlert("Falha ao obter imagem", "Por favor, tente novamente!")
      console.log(`[Def TirarFoto] (ERR) ${err}`)
    });   
  }

  // Abre o Modal de endereço
  async openAddress() {
    const modal = await this.modalController.create({
      component: ReportAddressPage
    });
    await modal.present();

    modal.onDidDismiss().then (data => { 
      console.log("Data from modal: ", data.data); 
      this.FillFields(data.data);
    })
  }

  // Enviar o report
  async createReport(animal_type: string, animal_description: string, animal_situation: string, location_cep: string, location_address: string, location_number: string, location_district: string, location_state: string, location_observation: string){
    if(!animal_type){
      this.alertService.showAlert("Preencha todas os campos", "Por favor, informe qual animal você está reportando.")
      return;
    }
    if(!animal_description){
      this.alertService.showAlert("Preencha todas os campos", "Por favor, informe a descrição do animal que você está reportando.")
      return;
    }
    if(!animal_situation){
      this.alertService.showAlert("Preencha todas os campos", "Por favor, informe a situação do animal que você está reportando.")
      return;
    }
    if(!location_cep){
      this.alertService.showAlert("Preencha todas os campos", "Por favor, informe o cep da localização onde o animal se encontra.")
      return;
    }
    if(!location_address){
      this.alertService.showAlert("Preencha todas os campos", "Por favor, informe o nome da rua da localização onde o animal se encontra.")
      return;
    }
    if(!location_number){
      this.alertService.showAlert("Preencha todas os campos", "Por favor, informe um número próximo da localização onde o animal se encontra.")
      return;
    }
    if(!location_district){
      this.alertService.showAlert("Preencha todas os campos", "Por favor, informe o bairro da localização onde o animal se encontra.")
      return;
    }
    if(!location_state){
      this.alertService.showAlert("Preencha todas os campos", "Por favor, informe o estado da localização onde o animal se encontra.")
      return;
    }
    if(!location_observation){
      this.alertService.showAlert("Preencha todas os campos", "Por favor, informe uma observação sobre a localização onde o animal se encontra.")
      return;
    }
    if(this.photo_animal == "assets/img/missing_photo.png"){
      this.alertService.showAlert("Tire uma foto", "Por favor, tire uma foto do animal clicando no icone de câmera.")
      return;
    }
    if(this.photo_reference == "assets/img/missing_photo.png"){
      this.alertService.showAlert("Tire uma foto", "Por favor, tire uma foto do ponto de referência clicando no icone de câmera.")
      return;
    }
    location_cep = location_cep.replace("-", "");

    // Muda o texto do botão de carregamento
    this.submit_button_text = "Aguarde...";

    await this.apiConnection.createReport(this.author_id, animal_type, animal_description, animal_situation, this.photo_animal.replace("data:image/jpeg;base64", ""), location_cep, location_address, location_number, location_district, location_state, this.photo_reference.replace("data:image/jpeg;base64", ""), location_observation)
      .then((response) => {
        const api_response = JSON.parse(response.data);
        console.log(api_response);
        

        if(api_response.message == "sucess_report_created"){
          this.alertService.showAlert("Report enviado com sucesso!", "O seu report foi enviado com sucesso e já está visível para que ONGs possam atender-lo.");   
          this.goTo('report');
        }

      })
      .catch((error) => {
        const api_error = JSON.parse(error.error);
        console.log(api_error);

        if(api_error.message == "internal_server_error" || api_error.message == "missing_required_data"){
          this.alertService.showAlert("Erro interno", "Se o problema persistir, contate o suporte.");
        }
      });

    // Muda o texto do botão de carregamento
    this.submit_button_text = "Enviar";
  }
  
  goTo(page: string){ 
    this.router.navigateByUrl("/" + page);
  }
} 
 