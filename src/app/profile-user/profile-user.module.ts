import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ProfileUserPageRoutingModule } from './profile-user-routing.module';

import { ProfileUserPage } from './profile-user.page';

// Custom Import
import { Camera } from '@ionic-native/Camera/ngx';
import { File } from '@ionic-native/file/ngx';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ProfileUserPageRoutingModule
  ],
  declarations: [ProfileUserPage],
  providers: [ Camera, File ]
})
export class ProfileUserPageModule {}
