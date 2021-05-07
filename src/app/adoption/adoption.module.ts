import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AdoptionPageRoutingModule } from './adoption-routing.module';

import { AdoptionPage } from './adoption.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AdoptionPageRoutingModule
  ],
  declarations: [AdoptionPage]
})
export class AdoptionPageModule {}
