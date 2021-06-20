import * as firebase from 'firebase/app';
import { Component, OnInit } from '@angular/core';
import {Validators, FormBuilder, FormGroup } from '@angular/forms';
import { AngularFireDatabase } from '@angular/fire/database';
import { Observable, from } from 'rxjs';
import { NavController } from '@ionic/angular';
import { Router } from '@angular/router';
import {AuthService} from '../services/auth.service';
import { AlertController } from '@ionic/angular';
import 'firebase/auth';
import { Facebook } from '@ionic-native/facebook/ngx';
import { Platform } from '@ionic/angular';
import { AngularFireAuth } from '@angular/fire/auth';
import { GooglePlus } from '@ionic-native/google-plus/ngx';
import {LoadingController} from '@ionic/angular'


@Component({
  selector: 'app-login-page',
  templateUrl: './connexion.page.html',
  styleUrls: ['./connexion.page.scss'],
})
export class ConnexionPage implements OnInit {
  userData: any = {}
  public log : FormGroup;
  isSubmitted = false;
  constructor(
    public loadingController: LoadingController,
    private googlePlus: GooglePlus,
    public nav: NavController,
    
    public authService: AuthService,
    private router: Router,
    private alertCtrl: AlertController,
    public afDB: AngularFireDatabase,
  public afAuth: AngularFireAuth,
  private fb: Facebook,
  public platform: Platform,
  private formBuilder: FormBuilder
    ) {
      this.log = this.formBuilder.group({
        password: ['', [Validators.required, Validators.minLength(4)]],
        login: ['', [Validators.required, Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$')]]
      });

  }

  get errorControl() {
    return this.log.controls;
  }
  
   wait(ms){
    var start = new Date().getTime();
    var end = start;
    while(end < start + ms) {
      end = new Date().getTime();
   }
 }

 reload(){
  window.location.reload();
 }
 
//connexion avec email verifieiii et mot de passe

  logIn() {
    this.isSubmitted = true;
    if (!this.log.valid) {
      console.log('Please provide all the required values!')
      return false;
    } else {
      console.log(this.log.value['password']);
      this.authService.SignIn(this.log.value['login'], this.log.value['password'])
      .then((res) => {
        if(this.authService.isEmailVerified) {
          this.router.navigate(['choix-cours']);          
        } else {
          window.alert('Email is not verified');
          return false;
        }
      }).catch((error) => {
        window.alert(error.message);
      });
      
    }
    
  }


//connexion avec facebook
  facebookLogin() {
    if (this.platform.is('cordova')) {
      console.log('PLateforme cordova');
      this.facebookCordova();
    } else {
      console.log('PLateforme Web');
      this.facebookWeb();
    }
}

facebookCordova() {
  this.fb.login(['email']).then( (response) => {
      const facebookCredential = firebase.auth.FacebookAuthProvider
          .credential(response.authResponse.accessToken);
      firebase.auth().signInWithCredential(facebookCredential)
      .then((success) => {
          console.log('Info Facebook: ' + JSON.stringify(success));
          this.router.navigateByUrl('choix-cours');
          this.afDB.object('Users/' + success.user.uid).set({
            displayName: success.user.displayName,
            email:success.user.email  
          
          });
      }).catch((error) => {
          console.log('Erreur: ' + JSON.stringify(error));
      });
  }).catch((error) => { console.log("fiileu",error); });
}

facebookWeb() {
  this.afAuth
    .signInWithPopup(new firebase.auth.FacebookAuthProvider())
    .then((success) => {
      this.router.navigateByUrl('choix-cours');
      console.log('Info Facebook: ' + JSON.stringify(success));
  this.afDB.object('Users/' + success.user.uid).set({
            displayName: success.user.displayName,
            email:success.user.email  
            
          });
    }).catch((error) => {
      console.log('Erreur: ' + JSON.stringify(error));
    });
}

  ngOnInit() {
  }

  googleLogin() {
    
        this.googlePlus.login({
          'webClientId': '141911003171-vcbg2bmujl11sl7igiro9j6rq5vdpgeu.apps.googleusercontent.com',
          'offline': true
        }).then( res => {
          console.log('res:',res)
                const googleCredential = firebase.auth.GoogleAuthProvider
                    .credential(res.idToken);
                    console.log(res.uid)
                    
                firebase.auth().signInWithCredential(googleCredential)
              .then( response => {
              
              
                this.afDB.object('Users/' + response.user.uid).set({
                  displayName: response.user.displayName,
                   email:response.user.email});
                
                   this.router.navigate(['choix-cours']);
                
                  
              });
        }, err => {
            console.error("Error: ", err)
           
        });
      
      }

     
      
}



