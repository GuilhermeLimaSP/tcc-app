import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ProfileAdoptionPageRoutingModule } from './profile-adoption-routing.module';

import { ProfileAdoptionPage } from './profile-adoption.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ProfileAdoptionPageRoutingModule
  ],
  declarations: [ProfileAdoptionPage]
})
export class ProfileAdoptionPageModule {}
