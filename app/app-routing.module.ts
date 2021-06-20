import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', loadChildren: () => import('./index/index.module').then( m => m.IndexPageModule)},

  {
 
    path: 'verify-email',
    loadChildren: () => import('./verify-email/verify-email.module').then( m => m.VerifyEmailPageModule)
  },
 
  {
    path: 'index',
    loadChildren: () => import('./index/index.module').then( m => m.IndexPageModule)
  },
  {
    path: 'connexion',
    loadChildren: () => import('./connexion/connexion.module').then( m => m.ConnexionPageModule)
  },
  
  {
    path: 'inscription',
    loadChildren: () => import('./inscription/inscription.module').then( m => m.InscriptionPageModule)
  },
  {
    path: 'my-cours',
    loadChildren: () => import('./my-cours/my-cours.module').then( m => m.MyCoursPageModule)
  },
  {
    path: 'choix-cours',
    loadChildren: () => import('./choix-cours/choix-cours.module').then( m => m.ChoixCoursPageModule)
  },
  {
    path: 'details-matiere/:libelle',
    loadChildren: () => import('./details-matiere/details-matiere.module').then( m => m.DetailsMatierePageModule)
  },
];

@NgModule({
  imports : [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
