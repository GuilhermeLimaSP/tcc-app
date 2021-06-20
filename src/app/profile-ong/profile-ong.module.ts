import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ProfileOngPageRoutingModule } from './profile-ong-routing.module';

import { ProfileOngPage } from './profile-ong.page';

// Custom Imports
import { PhotoViewer } from '@ionic-native/photo-viewer/ngx';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ProfileOngPageRoutingModule
  ],
  declarations: [ProfileOngPage],
  providers: [PhotoViewer]
})
export class ProfileOngPageModule {}
