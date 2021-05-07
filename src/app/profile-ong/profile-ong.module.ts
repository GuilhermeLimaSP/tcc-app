import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ProfileOngPageRoutingModule } from './profile-ong-routing.module';

import { ProfileOngPage } from './profile-ong.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ProfileOngPageRoutingModule
  ],
  declarations: [ProfileOngPage]
})
export class ProfileOngPageModule {}
