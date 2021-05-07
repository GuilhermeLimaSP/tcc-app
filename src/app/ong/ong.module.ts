import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { OngPageRoutingModule } from './ong-routing.module';

import { OngPage } from './ong.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    OngPageRoutingModule
  ],
  declarations: [OngPage]
})
export class OngPageModule {}
