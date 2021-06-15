import { Component, OnInit } from '@angular/core';

// Custom Imports
import { ActivatedRoute } from '@angular/router';
import { ApiConnectionService } from '../services/api-connection.service';

@Component({
  selector: 'app-view-report',
  templateUrl: './view-report.page.html',
  styleUrls: ['./view-report.page.scss'],
})
export class ViewReportPage implements OnInit {
  dataReport: any = {};
  loading: boolean = true;

  progressBarClassOne: any = "";
  progressBarClassTwo: any = "";
  progressBarClassThree: any = "";
  state: any = "";
  state_comments: any = "";
  state_icon: any = "";

  animal_type: any = ""; 
  animal_report_image: string = "";

  constructor(private route : ActivatedRoute,
              private apiConnection: ApiConnectionService) { }

  ngOnInit() {
    // Get Id
    const id = this.route.snapshot.params.id;
    console.log(`Id of report: ${id}`);

    // Get Animals
    this.apiConnection.getReport(id)
      .then((response)=>{
        this.dataReport = JSON.parse(response.data);
        console.log(this.dataReport);

        this.stepBarAlgorithm(this.dataReport.report_situation);
        this.TransformHumanFields(this.dataReport);

        if(this.dataReport['report_situation'] == "rescued"){
          this.animal_report_image = this.dataReport['report_img'];
        }
 
        // Fake Loader
        setTimeout(()=>{
          this.loading = false;
        }, 1500)
      }) 
      .catch((error)=>{
        const api_error = JSON.parse(error.error);
        console.log(api_error);       
      });
  }

  stepBarAlgorithm(state: any){
    // Sucess Progress
    if(state == "pending"){
      this.progressBarClassOne = "active";
      this.progressBarClassTwo = "";

      this.state = "Aguardando Ong";
      this.state_comments = "O seu report está esperando com que uma ONG ingresse no report.";
      this.state_icon = "time-outline";
    }
    if(state == "waiting" || state == "scheduled"){
      this.progressBarClassOne = "active";
      this.progressBarClassTwo = "active none-active";

      this.state = "Aguardando Resgate";
      this.state_comments = "Uma ONG já está atuando no caso do seu report, ela deve fornecer um novo stats em breve.";
      this.state_icon = "time-outline";
    }
    if(state == "rescued"){
      this.progressBarClassOne = "active";
      this.progressBarClassTwo = "active none-active";
      this.progressBarClassThree = "active none-active";

      this.state = "Animal Resgatado";
      this.state_comments = "A ONG informou que o animal em questão foi resgatado por eles.";
      this.state_icon = "checkmark-outline";
    }

    // Fail Progress
    if(state == "not_found"){
      this.progressBarClassOne = "active";
      this.progressBarClassTwo = "active none-active";
      this.progressBarClassThree = "active-failed none-active-failed";  

      this.state = "Animal não localizado";
      this.state_comments = "A ONG informou que o animal em questão não foi localizado no endereço informado, você pode tentar novamente criando um novo report com um endereço atualizado, caso haja.";
      this.state_icon = "close-circle-outline";
    }
  }

  TransformHumanFields(data: any){
    switch (data.animal_type) {
      case 'cat':
        this.animal_type = "Gato";
        break;
      case 'dog':
        this.animal_type = "Cachorro";
        break;
      default:
        this.animal_type = "Outros";
    }
  }

}
