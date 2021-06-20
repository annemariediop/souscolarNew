import { Component, OnInit } from '@angular/core';

import {AuthService} from '../services/auth.service';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-verify-email',
  templateUrl: './verify-email.page.html',
  styleUrls: ['./verify-email.page.scss'],
})
export class VerifyEmailPage implements OnInit {

  constructor( public authService: AuthService,private alertCtrl: AlertController) { }

  ngOnInit() {
  }
  async message(){

    const alert = await this.alertCtrl.create({
      
      
      message: 'Pousser l ecran vers le bas pour raffraichir la page avant de vous connecter',
      buttons: ['OK']
    });
    await alert.present();
  
    
  }
}
