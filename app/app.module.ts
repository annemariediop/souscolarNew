import { environment } from '../environments/environment.prod';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';

import { AngularFireModule } from '@angular/fire';
import { AngularFireDatabaseModule } from '@angular/fire/database';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { Facebook } from '@ionic-native/facebook/ngx';

import { IonicRatingModule } from 'ionic4-rating';
import {GooglePlus } from '@ionic-native/google-plus/ngx'

// export const firebase={
//   apiKey: "AIzaSyCo-rq7C-li_18NXsnaSloxrtUia1nzrHk",
//   authDomain: "souscolar.firebaseapp.com",
//   databaseURL: "https://souscolar.firebaseio.com",
//   projectId: "souscolar",
//   storageBucket: "souscolar.appspot.com",
//   messagingSenderId: "382401743066",
//   appId: "1:382401743066:web:218a0583efe1e1d898fde3"
// };

@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
  imports: [BrowserModule,
    IonicModule.forRoot(), 
    AppRoutingModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireDatabaseModule,
    AngularFireAuthModule,
    AngularFirestoreModule,
    IonicRatingModule],
  providers: [
    StatusBar,
    SplashScreen,
    GooglePlus,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
   
    AngularFirestoreModule,
    Facebook,
    
    
  ],
  bootstrap: [AppComponent]
})
export class AppModule {

}

