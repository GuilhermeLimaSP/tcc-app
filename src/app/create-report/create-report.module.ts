import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

// Importar páginas
import { CreateReportPageRoutingModule } from './create-report-routing.module';
import { CreateReportPage } from './create-report.page';

// Importar plugins
import { Geolocation } from '@ionic-native/geolocation/ngx';
import { NativeGeocoder } from '@ionic-native/native-geocoder/ngx';
import { Camera } from '@ionic-native/camera/ngx';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CreateReportPageRoutingModule
  ],
  declarations: [CreateReportPage],
  providers: [Geolocation, NativeGeocoder, Camera]
})
export class CreateReportPageModule {}
 