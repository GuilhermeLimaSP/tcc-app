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

    // Get Animals
    this.apiConnection.getAnimal(id)
    .then((response)=>{
      this.dataAnimal = JSON.parse(response.data);
      console.log(this.dataAnimal);
      // Get Ong
      this.apiConnection.getOng(this.dataAnimal.ong_id)
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
      })
    })
    .catch((error)=>{
      const api_error = JSON.parse(error.error);
      console.log(api_error);       
    });
  }

}
