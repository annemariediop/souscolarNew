import { Injectable } from '@angular/core';
import { Adresse } from "./adresse";
import { auth } from 'firebase/app';
import { AngularFireDatabase, AngularFireList, AngularFireObject } from '@angular/fire/database';
import { AngularFireAuth } from '@angular/fire/auth';

@Injectable({
  providedIn: 'root'
})
export class AdresseService {
  adresseRef: AngularFireList<any>;
  userid: string;
  //bookingRef: AngularFireObject<any>;
  


  constructor(private db: AngularFireDatabase, private afAuth: AngularFireAuth) { 
    this.afAuth.authState.subscribe(user =>{
      if (user) this.userid=user.uid
    })
  }

  // Create
  createAdresse (adr: Adresse) {
    //adr.userid=this.userid
    return this.db.list(`AdresseUser/${this.userid}`).push({
      adresse1: adr.adresse1,
      adresse2: adr.adresse2,
      ville: adr.ville,
      codePostal: adr.codePostal
    })
  }

}