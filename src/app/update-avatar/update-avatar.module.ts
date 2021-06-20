import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { UpdateAvatarPageRoutingModule } from './update-avatar-routing.module';

import { UpdateAvatarPage } from './update-avatar.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    UpdateAvatarPageRoutingModule
  ],
  declarations: [UpdateAvatarPage]
})
export class UpdateAvatarPageModule {}
