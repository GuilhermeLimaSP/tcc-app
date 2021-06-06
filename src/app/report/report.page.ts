import { Component, OnInit } from '@angular/core';

// Custom Import
import { ApiConnectionService } from '../services/api-connection.service';
import { StorageService } from '../services/storage.service';

@Component({
  selector: 'app-report',
  templateUrl: './report.page.html',
  styleUrls: ['./report.page.scss'],
})
export class ReportPage implements OnInit {
  reports = new Array();
  loading: boolean = true;

  constructor(private storage: StorageService,
              private apiConnection: ApiConnectionService) { }

  async ngOnInit() {
    // Get logged user
    const data = await this.storage.getData();
    console.log("Connected userdata:");
    console.log(data);

    // User Id
    const author_id = data.id;

    // Get Reports 
    this.apiConnection.getAllUserReports(author_id)
      .then((response)=>{
        this.reports = JSON.parse(response.data);

        console.log(this.reports);

        // disable loading bar (fake delay)
        setTimeout(() => {
          this.loading = false;
        }, 1000)
      })
      .catch((error)=>{
        const api_error = JSON.parse(error.error);
        console.log(error);  

        setTimeout(() => {
          this.loading = false;
        }, 1000)    
      })
    }

}
