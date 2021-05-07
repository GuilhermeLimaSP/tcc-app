import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertsService } from '../services/alerts.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  constructor(private router: Router,
              private alertService: AlertsService) { }

  ngOnInit() {
  }

  changePassword(){
    this.alertService.showAlert("Troca de senha", "Para trocar sua senha entre em contato com o suporte!")
  }
  goTo(page: string){ 
    this.router.navigateByUrl("/" + page);
  }

}
 