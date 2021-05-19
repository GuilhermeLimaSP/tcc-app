import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';

// Page Import For Modals
import { ReportGpsPageModule } from './report-gps/report-gps.module';
import { ReportAddressPageModule } from './report-address/report-address.module';
import { ProfileUserPageModule } from './profile-user/profile-user.module';
import { UserPasswordPageModule } from './user-password/user-password.module';

// Custom Imports
import { HTTP } from '@ionic-native/http/ngx';
import { NativeStorage } from '@ionic-native/native-storage/ngx';

@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
  imports: [BrowserModule, IonicModule.forRoot(), AppRoutingModule, ReportGpsPageModule, ReportAddressPageModule, ProfileUserPageModule, UserPasswordPageModule],
  providers: [{ provide: RouteReuseStrategy, useClass: IonicRouteStrategy }, HTTP, NativeStorage],
  bootstrap: [AppComponent],
})
export class AppModule {}
