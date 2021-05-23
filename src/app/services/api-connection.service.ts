import { Injectable } from '@angular/core';

// Custom Imports
import { HTTP } from '@ionic-native/http/ngx';

@Injectable({
  providedIn: 'root'
})
export class ApiConnectionService {
  baseUrl = "http://localhost/tcc/api/functions";
  baseImagePath = "http://localhost/tcc/imgs/";

  constructor(private http: HTTP) {
    this.http.setDataSerializer("json");
  }

  login(email: string, password: string){
    const requestUrl = `${this.baseUrl}/user/login.php`;

    return this.http.get(requestUrl, {
      email: email,
      pwd: password
    }, {});
  }

  createAccount(name: string, email: string, password: string, img: string, phone: string, cep: string){
    const headers = {
      "Content-Type": "application/json; charset=UTF-8"
    }
    const requestUrl = `${this.baseUrl}/user/create.php`;

    const data = {
      'name': name,
      'email': email,
      'pwd': password, 
      'img': img, 
      'phone': phone, 
      'cep': cep
    }

    return this.http.post(requestUrl, data, headers);
  }

  getAnimals(){
    const requestUrl = `${this.baseUrl}/animal/get_all.php`;

    return this.http.get(requestUrl, {}, {});
  }
  getAnimal(id: Number){
    const requestUrl = `${this.baseUrl}/animal/get.php`;

    return this.http.get(requestUrl, {
      id: id
    }, {});
  }

  getOngs(){
    const requestUrl = `${this.baseUrl}/ong/get_all.php`;

    return this.http.get(requestUrl, {}, {});
  }
  getOng(id: Number){
    const requestUrl = `${this.baseUrl}/ong/get.php`;

    return this.http.get(requestUrl, {
      id: id
    }, {});
  }
  
}
 