import { Component } from '@angular/core';
@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  public appPages = [
    { title: 'Adoções', url: '/adoption', icon: 'earth-outline' },
    { title: 'ONGs', url: '/ong', icon: 'home-outline' },
    { title: 'Reports', url: '/report', icon: 'clipboard-outline' },
    { title: 'Perfil', url: '/profile', icon: 'person-circle-outline' },
    { title: 'Sair', url: '../login', icon: 'exit-outline' }
  ];
  constructor() {}
}
