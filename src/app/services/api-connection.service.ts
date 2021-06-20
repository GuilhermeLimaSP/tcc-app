import { Injectable } from '@angular/core';

// Custom Imports
import { HTTP } from '@ionic-native/http/ngx';

@Injectable({
  providedIn: 'root'
})
export class ApiConnectionService {
  baseUrl = "http://192.168.0.108/tcc/tcc/api/functions";
  baseImagePath = "http://192.168.0.108/tcc/tcc/imgsUpdate/";
  google_key = "AIzaSyD6xzSfe7eqe_JPxnA9HZj1EB4hpl4UAn4";

  constructor(private http: HTTP) {
    // this.http.setDataSerializer("json");
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

    this.http.setDataSerializer('json');

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

    this.http.setDataSerializer('json');
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
  
    this.http.setDataSerializer('json');
    return this.http.put(requestUrl, data, headers);      
  }

  createReport(author_id: Number, animal_type: string, animal_description: string, animal_situation: string, animal_photo: any, location_cep: string, location_address: string, location_number: string, location_district: string, location_state: string, location_photo: string, location_observation: string){
    const headers = {
      "Content-Type": "application/json; charset=UTF-8"
    }
    const requestUrl = `${this.baseUrl}/report/create.php`;

    const data = {
      'author_id': author_id,
      'animal_type': animal_type,
      'animal_description': animal_description, 
      'animal_situation': animal_situation, 
      'animal_photo': animal_photo, 
      'location_cep': location_cep,
      'location_address': location_address,
      'location_number': location_number,
      'location_district': location_district,
      'location_state': location_state,
      'location_photo': location_photo,
      'location_observation': location_observation
    }

    this.http.setDataSerializer('json');
    return this.http.post(requestUrl, data, headers); 
  }

  getAllUserReports(author_id: String){
    const requestUrl = `${this.baseUrl}/report/get_all.php`;

    return this.http.get(requestUrl, {
      id: author_id
    }, {});
  }

  getReport(report_id: String){
    const requestUrl = `${this.baseUrl}/report/get.php`;

    return this.http.get(requestUrl, {
      id: report_id
    }, {});
  }

  PingApi(){
    const requestUrl = `${this.baseUrl}/utils/ping.php`;

    return this.http.get(requestUrl, {}, {});
  }

  updateAvatar(email: string, password: string, base64_image: string){
    const headers = {
      "Content-Type": "application/json; charset=UTF-8"
    }
    const requestUrl = `${this.baseUrl}/user/update_avatar.php`;

    const data = {
      'email': email,
      'pwd': password,
      'new_avatar': base64_image
    }

    this.http.setDataSerializer('json');
    return this.http.put(requestUrl, data, headers); 
  }

  OngView(id: number){
    const headers = {
      "Content-Type": "application/json; charset=UTF-8"
    }
    const requestUrl = `${this.baseUrl}/ong/view.php`;

    const data = {
      'id': id,
    }

    this.http.setDataSerializer('json');
    return this.http.put(requestUrl, data, headers); 
  }

}
 