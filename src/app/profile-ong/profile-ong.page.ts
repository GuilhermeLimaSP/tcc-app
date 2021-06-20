import { Component, OnInit } from '@angular/core';

// Custom Imports
import { ActivatedRoute } from '@angular/router';
import { ApiConnectionService } from '../services/api-connection.service';
import { PhotoViewer } from '@ionic-native/photo-viewer/ngx';

@Component({
  selector: 'app-profile-ong',
  templateUrl: './profile-ong.page.html',
  styleUrls: ['./profile-ong.page.scss'],
})
export class ProfileOngPage implements OnInit {
  id: number;
  dataOng: any = {}; 
  loading: boolean = true;
  timerView: any;

  constructor(private route : ActivatedRoute,
              private apiConnection: ApiConnectionService,
              private photoViewer: PhotoViewer) { }

  ngOnInit() {
    // Get Id
    this.id = this.route.snapshot.params.id;
    console.log(`Id of ong: ${this.id}`);

    // Get Animals
    this.apiConnection.getOng(this.id)
    .then((response)=>{
      this.dataOng = JSON.parse(response.data);
      console.log(this.dataOng);

      // disable loading bar && set intentional delay
      setTimeout(()=>{
        this.loading = false;
        this.viewTimer();
      }, 500)
    })
    .catch((error)=>{
      const api_error = JSON.parse(error.error);
      console.log(api_error);       
    });
  }

  ionViewDidLeave(){
    if(this.timerView){
      clearTimeout(this.timerView)
      console.log("viewTimer() canceled")
    }
  }

  viewTimer(){
    this.timerView = setTimeout(() => {
      console.log("viewTimer() running");

      this.apiConnection.OngView(this.id)
        .then((response) => {
          const api_response = JSON.parse(response.data);
          console.log(api_response);

          if(api_response.message == "sucess"){
            console.log("Sucess view count;")
          }
        })
        .catch((error) => {
          const api_error = JSON.parse(error.error);
          console.log(api_error);
        })

        this.timerView = null;
      }, 15000);
  }

  imgFullscreen(url: string, name: string){
    this.photoViewer.show(url, name)
  }

}
