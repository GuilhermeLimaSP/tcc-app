import { Component, OnInit } from '@angular/core';

// Custom Imports
import { ActivatedRoute } from '@angular/router';
import { ApiConnectionService } from '../services/api-connection.service';

@Component({
  selector: 'app-profile-ong',
  templateUrl: './profile-ong.page.html',
  styleUrls: ['./profile-ong.page.scss'],
})
export class ProfileOngPage implements OnInit {
  dataOng: any = {}; 
  loading: boolean = true;

  constructor(private route : ActivatedRoute,
              private apiConnection: ApiConnectionService) { }

  ngOnInit() {
    // Get Id
    const id = this.route.snapshot.params.id;
    console.log(`Id of ong: ${id}`);

    // Get Animals
    this.apiConnection.getOng(id)
    .then((response)=>{
      this.dataOng = JSON.parse(response.data);
      console.log(this.dataOng);

      // disable loading bar && set intentional delay
      setTimeout(()=>{
        this.loading = false;
      }, 500)
    })
    .catch((error)=>{
      const api_error = JSON.parse(error.error);
      console.log(api_error);       
    });
  }

}
