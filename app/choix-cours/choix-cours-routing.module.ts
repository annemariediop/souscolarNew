import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ChoixCoursPage } from './choix-cours.page';

const routes: Routes = [
  {
    path: '',
    component: ChoixCoursPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ChoixCoursPageRoutingModule {}
