import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DetailsMatierePageRoutingModule } from './details-matiere-routing.module';

import { DetailsMatierePage } from './details-matiere.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DetailsMatierePageRoutingModule
  ],
  declarations: [DetailsMatierePage]
})
export class DetailsMatierePageModule {}
