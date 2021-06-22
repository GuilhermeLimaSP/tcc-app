import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UtilsService {

  constructor() { }

   /*  Método: validation_email 
      Parâmetros: [
        email: Email do usuário
      ]
      Objetivo: Retorna True se o email for válido, caso contrário, retorna false // está função usa Regex
  */
  validation_email(email: string) {
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    
    return re.test(String(email).toLowerCase());
  }

   /*  Método: validation_cep 
      Parâmetros: [
        cep: Cep da localização
      ]
      Objetivo: Retorna True se o cep for válido, caso contrário, retorna false // está função usa Regex
  */
  validation_cep(cep: string){
    const re = /(\d{5})-?(\d{3})/;

    return re.test(cep);
  }

   /*  Método: validation_phone 
      Parâmetros: [
        phone: Valida se um telefone é valido
      ]
      Objetivo: Retorna True se o telefone for válido, caso contrário, retorna false // está função usa Regex
  */
  validation_phone(phone: string){
    const re = /^\(?[1-9]{2}\)? ?(?:[2-8]|9[1-9])[0-9]{3}\-?[0-9]{4}$/;

    return re.test(phone);
  }

  /*  Método: revertDate 
      Parâmetros: [
        data: Uma data no formato SQL (EN)
      ]
      Objetivo: Retorna a variavel no formato PT-BR
  */
  revertDate(data: string){
    return data.split('-').reverse().join('/');
  }
}
