import { ThrowStmt } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { ApiConnectionService } from '../services/api-connection.service';

// Custom Imports (Services)
import { StorageService } from '../services/storage.service';

@Component({
  selector: 'app-adoption',
  templateUrl: './adoption.page.html',
  styleUrls: ['./adoption.page.scss'],
})
export class AdoptionPage implements OnInit {
  animals = new Array();
  loading: boolean = true;

  constructor(private storage: StorageService,
              private apiConnection: ApiConnectionService) {
   }

  async ngOnInit() {
    // Get logged user
    const data = await this.storage.getData();
    console.log("Connected userdata:");
    console.log(data);

    // Get Animals 
    this.apiConnection.getAnimals()
      .then((response)=>{
        this.animals = JSON.parse(response.data);

        console.log(this.animals);

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
  