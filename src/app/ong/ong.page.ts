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

  ngOnInit() {
    // Get Animals 
    this.apiConnection.getOngs()
    .then((response)=>{
      this.ongs = JSON.parse(response.data);

      console.log(this.ongs);

      // disable loading bar
      setTimeout(() => {
        this.loading = false;
      }, 500)
    })
    .catch((error)=>{
      const api_error = JSON.parse(error.error);

      console.log(api_error);       
    })
  }

}
