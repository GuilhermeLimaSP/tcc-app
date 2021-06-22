import { Injectable } from '@angular/core';

// Custom Import
import { NativeStorage } from '@ionic-native/native-storage/ngx';

@Injectable({
  providedIn: 'root'
})
export class StorageService {
  constructor(private nativeStorage: NativeStorage) {
  }
 
   /*  Método: setData 
      Parâmetros: [
        data: data a ser guardada (modelo abaixo)
      ]
      Objetivo: Guarda um objeto javascript 
  */
  setData(data: any){
    /** Modelo da data
      const data = { 
        name: api_response.nome, 
        email: api_response.email 
      }
    */
    this.nativeStorage.setItem('userdata', data)
     .then(
        (res) => console.log('Stored data sucessfy!'),
        err => console.log('Error at storing data!')
      );
  }
  
  /*  Método: getData 
      Parâmetros: []
      Objetivo: Retorna os dados guardados anteriormente
  */
  async getData() {
    return this.nativeStorage.getItem('userdata')
  }

  /*  Método: removeData 
      Parâmetros: []
      Objetivo: Delete os dados guardados
  */
  removeData(){
    this.nativeStorage.remove('userdata')
  }
}
