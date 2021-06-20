import { Component, OnInit } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import { Router } from '@angular/router';
import {Validators, FormBuilder, FormGroup } from '@angular/forms';
import {AuthService} from '../services/auth.service';
import { AlertController } from '@ionic/angular';
import 'firebase/auth';
import * as firebase from 'firebase';
import { Facebook } from '@ionic-native/facebook/ngx'
import { User } from './../services/user';



import { AngularFireAuth } from '@angular/fire/auth';

@Component({
  selector: 'app-inscription',
  templateUrl: './inscription.page.html',
  styleUrls: ['./inscription.page.scss'],
})
export class InscriptionPage implements OnInit {

 
  providerFb: firebase.auth.FacebookAuthProvider;
 credentials={nom:"", prenom:"", email:"",mdp:"", mdp1:""};
 public signer : FormGroup;
 isSubmitted = false;
  constructor(public afDB: AngularFireDatabase,
    private authService: AuthService,
  private alertCtrl: AlertController,
  private router: Router,public facebook: Facebook,
  private formBuilder: FormBuilder,
  public afAuth: AngularFireAuth
  
  ) { 

   
    this.signer = this.formBuilder.group({
      name: ['', [Validators.required, Validators.minLength(3)]],
      surname: ['', [Validators.required, Validators.minLength(3)]],
      email: ['', [Validators.required, Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$')]],
      password: ['', Validators.compose([Validators.required, Validators.minLength(6), Validators.maxLength(12)])],
      confirmPassword: ['', [Validators.required]]
    },
    {validator: this.matchingPasswords('password', 'confirmPassword')}  );
    this.providerFb = new firebase.auth.FacebookAuthProvider();
  }
  matchingPasswords(passwordKey: string, confirmPasswordKey: string) {
    // TODO maybe use this https://github.com/yuyang041060120/ng2-validation#notequalto-1
    return (group: FormGroup): {[key: string]: any} => {
      let password = group.controls[passwordKey];
      let confirmPassword = group.controls[confirmPasswordKey];

      if (password.value !== confirmPassword.value) {
        return {
          mismatchedPasswords: true
        };
      }
    }
  }

  ngOnInit() {
  }

  

  async SignIn(): Promise<void> {
    this.isSubmitted = true;
    if (!this.signer.valid) {
      console.log('Please provide all the required values!');
     
    } else {
    this.authService.RegisterUser(this.signer.value['email'], this.signer.value['password']).then(
      // (res) => {
      //   let user: User={
      //     uid:res.user.uid,
      //     nom: credentials.nom,
      //     prenom: credentials.prenom,
      //     email: credentials.email
      //   };
      (res) => {
        this.authService.SendVerificationMail();
        this.router.navigate(['verify-email']);

        
        this.afDB.object(`Users/${res.user.uid}`).set({
          displayName:this.signer.value['surname'] +" "+this.signer.value['name'],
          email:this.signer.value['email']


          });
        
        
       // this.router.navigateByUrl('login-page');
       
       
      },
      async error => {
        const alert = await this.alertCtrl.create({
          message: error.message,
          buttons: [{ text: 'Ok', role: 'cancel' }],
        });
        await alert.present();
      }
    );
    }
  }
  get errorControl() {
    return this.signer.controls;
  }

  async message(){

    const alert = await this.alertCtrl.create({
      
      
      message: 'Pousser l ecran vers le bas pour raffraichir la page avant de vous connecter',
      buttons: ['OK']
    });
    await alert.present();
  
    
  }
 
  


}
