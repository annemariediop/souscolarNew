import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ChoixCoursPageRoutingModule } from './choix-cours-routing.module';

import { ChoixCoursPage } from './choix-cours.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ChoixCoursPageRoutingModule
  ],
  declarations: [ChoixCoursPage]
})
export class ChoixCoursPageModule {}
