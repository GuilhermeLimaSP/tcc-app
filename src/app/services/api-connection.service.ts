import { Injectable } from '@angular/core';

// Custom Imports
import { HTTP } from '@ionic-native/http/ngx';

@Injectable({
  providedIn: 'root'
})
export class ApiConnectionService {
  baseUrl = "http://127.0.0.1/tcc/api/functions";
  baseImagePath = "http://127.0.0.1/tcc/tcc/imgs/";

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

  changePassword(email: string, current_password: string, new_password: string){
    const headers = {
      "Content-Type": "application/json; charset=UTF-8"
    }
    const requestUrl = `${this.baseUrl}/user/update_password.php`;

    const data = { 
      'email': email,
      'current_pwd': current_password, 
      'new_pwd': new_password
    }

    return this.http.put(requestUrl, data, headers);   
  }
  
  changeInfos(password: string, email: string, cep: string, phone: string){
    const headers = {
      "Content-Type": "application/json; charset=UTF-8"
    }
    const requestUrl = `${this.baseUrl}/user/update_info.php`;

    const data = {  
      'current_pwd': password,
      'email': email,
      'cep': cep, 
      'phone': phone
    }

    console.log("sending data")
    console.log(data);
    return this.http.put(requestUrl, data, headers);      
  }
  
}
 