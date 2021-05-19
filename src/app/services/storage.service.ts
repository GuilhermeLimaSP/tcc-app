import { Injectable } from '@angular/core';

// Custom Import
import { NativeStorage } from '@ionic-native/native-storage/ngx';

@Injectable({
  providedIn: 'root'
})
export class StorageService {
  constructor(private nativeStorage: NativeStorage) {
  }

  
  /** Modelo da data
    const data = { 
      name: api_response.nome, 
      email: api_response.email 
    }
   */
  setData(data: any){
    this.nativeStorage.setItem('userdata', data)
     .then(
        (res) => console.log('Stored data sucessfy!'),
        err => console.log('Error at storing data!')
      );
  }

  async getData() {
    return this.nativeStorage.getItem('userdata')
  }

  removeData(){
    this.nativeStorage.remove('userdata')
  }
}
