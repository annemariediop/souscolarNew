import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MyCoursPageRoutingModule } from './my-cours-routing.module';

import { MyCoursPage } from './my-cours.page';
import { IonicRatingModule } from "ionic4-rating";

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MyCoursPageRoutingModule,
    IonicRatingModule
  ],
  declarations: [MyCoursPage]
})
export class MyCoursPageModule {}
