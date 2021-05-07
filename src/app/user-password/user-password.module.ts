import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { UserPasswordPageRoutingModule } from './user-password-routing.module';

import { UserPasswordPage } from './user-password.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    UserPasswordPageRoutingModule
  ],
  declarations: [UserPasswordPage]
})
export class UserPasswordPageModule {}
