import { Injectable } from '@angular/core';

// Custom Imports
import { HTTP } from '@ionic-native/http/ngx';

@Injectable({
  providedIn: 'root'
})
export class ApiConnectionService {
  baseUrl = "http://192.168.0.108/tcc/tcc/api/functions"; 
  baseImagePath = "http://192.168.0.108/tcc/tcc/imgsUpdate/"; 
  google_key = "MyKey";

  constructor(private http: HTTP) {}

  /*  Rota de login
      Parâmetros: [
        email: E-mail do usuário
        password: Senha do usuário
      ]
      Objetivo: Verifica as credenciais de acesso de um usuário
  */
  login(email: string, password: string){
    const requestUrl = `${this.baseUrl}/user/login.php`;
 
    return this.http.get(requestUrl, {
      email: email,
      pwd: password
    }, {});
  }

  /*  Rota de criação de conta
      Parâmetros: [
        name: Nome do usuário
        email: E-mail do usuário
        password: Senha do usuário
        img: Imagem do usuário (envie vazio)
        phone: Telefone do usuário
        cep: Cep do usuário
      ]
      Objetivo: Efetuar uma chamada a API para cadastrar um usuário
  */
  createAccount(name: string, email: string, password: string, img: string, phone: string, cep: string){
    const headers = {
      "Content-Type": "application/json; charset=UTF-8"
    }
    const requestUrl = `${this.baseUrl}/user/create.php`;

    const data = { //payload ou packet
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

  /*  Rota parar obter animais
      Parâmetros: []
      Objetivo: Retornar um array com objetos com informações dos animais disponíveis para adoção
  */
  getAnimals(){
    const requestUrl = `${this.baseUrl}/animal/get_all.php`;

    return this.http.get(requestUrl, {}, {});
  }

  /*  Rota parar obter um animal
      Parâmetros: [
        id: Id do animal
      ]
      Objetivo: Retornar um objeto com informações de um animal específico
  */
  getAnimal(id: Number){
    const requestUrl = `${this.baseUrl}/animal/get.php`;

    return this.http.get(requestUrl, {
      id: id
    }, {});
  }

  /*  Rota para obter ongss
      Parâmetros: []
      Objetivo: Retornar um array com objetos com informações das ongs disponíveis
  */
  getOngs(){
    const requestUrl = `${this.baseUrl}/ong/get_all.php`;

    return this.http.get(requestUrl, {}, {});
  }
  
  /*  Rota parar obter uma ong
      Parâmetros: [
        id: Id da ONG
      ]
      Objetivo: Retornar um objeto com informações de uma ong específico
  */
  getOng(id: Number){
    const requestUrl = `${this.baseUrl}/ong/get.php`;

    return this.http.get(requestUrl, {
      id: id
    }, {});
  }

  /*  Rota parar mudar a senha de um usuário
      Parâmetros: [
        email: E-mail do usuário
        current_password: Senha atual do usuário
        new_password: Nova senha do usuário
      ]
      Objetivo: Chama a API para atualizar a senha do usuário
  */
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
 
  /*  Rota parar mudar informações do usuário
      Parâmetros: [
        password: Senha atual do usuário
        email: E-mail do usuário
        cep: Cep do usuáiro
        phone: telefone do usuário
      ]
      Objetivo: Chama a API para atualizar informações do usuário
  */
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

  /*  Rota para criar um report
      Parâmetros: [
        author_id: Id do usuário
        animal_type: Tipo do animal;
        animal_description: Descrição do animal;
        animal_situation: Situação do animal;
        animal_photo: Foto do animal em base64;
        location_cep: Cep da localização;
        location_address: Nome da rua da localização;
        location_number: Número da rua;
        location_district: Bairro da rua;
        location_state: Estado da localização;
        location_observation: Observações sobre a localização
      ]
      Objetivo: Chama a API criar um report 
  */
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

  /*  Rota para obter todos reports de um usuário
      Parâmetros: [
        author_id: Id do usuário
      ]
      Objetivo: Retornar um array com objetos contendo informações sobre os reports já enviados pelo usuário
  */
  getAllUserReports(author_id: String){
    const requestUrl = `${this.baseUrl}/report/get_all.php`;

    return this.http.get(requestUrl, {
      id: author_id
    }, {});
  }

  /*  Rota para obter um report de um usuário
      Parâmetros: [
        report_id: Id do report
      ]
      Objetivo: Retornar um array com objetos contendo informações sobre um report já enviado
  */
  getReport(report_id: String){
    const requestUrl = `${this.baseUrl}/report/get.php`;

    return this.http.get(requestUrl, {
      id: report_id
    }, {});
  }

  /*  Rota para efetuar um teste de conexão com a API
      Parâmetros: []
      Objetivo: Retorna uma mensagem "pong" caso consiga conexão com a API
  */
  PingApi(){
    const requestUrl = `${this.baseUrl}/utils/ping.php`;

    return this.http.get(requestUrl, {}, {});
  }

  /*  Rota para efetuar a atualização do avatar do usuário
      Parâmetros: [
        email: e-mail do usuário
        password: senha do usuário
        base64_image: Imagem do usuário em base64
      ]
      Objetivo: Retorna uma mensagem "pong" caso consiga conexão com a API
  */
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

  /*  Rota para efetuar o incremento de visualização de uma ong
      Parâmetros: [
        id: Id da ONG
      ]
      Objetivo: Faz uma chamada a API para aumentar a visualização do perfil de uma ONG
  */
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
 