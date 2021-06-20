
import { Component, OnInit, SystemJsNgModuleLoader } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFireDatabase } from '@angular/fire/database';
import { NavController } from '@ionic/angular';
import { AlertController } from '@ionic/angular';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
export interface UserInfos {
  nom: string;
  email: string;
  
}

@Component({
  selector: 'app-choix-cours',
  templateUrl: './choix-cours.page.html',
  styleUrls: ['./choix-cours.page.scss'],
})
export class ChoixCoursPage implements OnInit {

  [x: string]: any;
rate: any;
  infosUser=[];
  matieresautre=[];
  matieres=[];
  matiereslangue=[];
  matieresart=[];
  modules=[];
  profs=[];
  matieresmod=[];
  mat='';
  matier='';
  etoiles;
  username: String;
  libelle2: String;

  emailUser: string;
  constructor(public afDB: AngularFireDatabase,private alertCtrl: AlertController,private afAuth: AngularFireAuth, public nav: NavController,) {
      
     // this.getMatieres();
     
      this.getModules();
      this.getMatieres();
      
     
     }
  
    ngOnInit() {
      this.afAuth.authState.subscribe(async user =>{
        if (user) {
          this.userid=user.uid;
          this.username=user.displayName;
          console.log(this.userid);
        }
      })
      
      
    }

   
    
  //Recuperer la liste des modules
    getModules(){
      this.afDB.list('ListeMatieres').snapshotChanges(['child_added', 'child_removed']).subscribe(actions => {
        this.modules = [];
        actions.forEach(action => {
          this.modules.push(action);
        });
        //console.log(this.modules);
        });
        
    }
  
  
   
    
   async getMatieresMod(module) {
     console.log(module)
      this.afDB.list(`ListeMatieres/${module}`).snapshotChanges(['child_added', 'child_removed']).subscribe(async actions => {
        this.matieresmod = [];
        actions.forEach(action => {
          this.matieresmod.push({
          libelle: action.payload.exportVal().libelle
          
          });
        });
       
       
      
        let radio_options = [];
        for(let mod of this.matieresmod){
          console.log( mod.libelle)
           radio_options.push({
             
            type: 'radio',
            label : mod.libelle,
            value : mod.libelle,
          
          });
        }
      
        let alert = await this.alertCtrl.create({
           // Header : 'Choose one',
            inputs : radio_options ,
            buttons: [
                  {
                    text: 'Cancel',
                    role: 'cancel',
                    handler: () => {
                      console.log('Cancel clicked');
                    }
                  },
                  {
                    text: 'OK',
                    handler: data => {
                    
                      this.getProfs(data);
                      //console.log(data);
                      
  
  
                  }
                  }
                 ]
           
        });
        
        await alert.present();
        });
       
       }
  
   
     

       
                        
   
        getMatieres(){
          
         // this.matieresnew = [];
          //this.langues = [];
          this.afDB.list('ListeMatieres/art').snapshotChanges(['child_added', 'child_removed']).subscribe(actions => {
              actions.forEach(action => {	
                this.matieres.push({
                key: action.key,
                libelle: action.payload.exportVal().libelle
                });
              });
          });  
          this.afDB.list('ListeMatieres/scientifique').snapshotChanges(['child_added', 'child_removed']).subscribe(actions => {
              actions.forEach(action => {	
                this.matieres.push({
                key: action.key,
                libelle: action.payload.exportVal().libelle
                });
              });
          });  
          
          this.afDB.list('ListeMatieres/langue').snapshotChanges(['child_added', 'child_removed']).subscribe(actions => {
              actions.forEach(action => {	
                this.matieres.push({
                key: action.key,
                libelle: action.payload.exportVal().libelle
                });
              });
          });  
          
          
        
       
        }  

        getProfs(libelle: String){
        //  console.log(libelle);
          this.afDB.list('professeur/').snapshotChanges(['child_added', 'child_removed']).subscribe(actions => {
            this.profs=[];
            actions.forEach(action => {
             
              if(action.payload.exportVal().matiere.toLowerCase()==libelle.toLowerCase()){
                console.log("ici");
                this.profs.push({
                  
                  prenom: action.payload.exportVal().prenom,
                  nom: action.payload.exportVal().nom,
                  niveaux: action.payload.exportVal().niveaux,
                  matiere: action.payload.exportVal().matiere,
                  ville: action.payload.exportVal().ville,
                  disponibilite: action.payload.exportVal().disponibilite,
                  description:action.payload.exportVal().description,
                  numero:action.payload.exportVal().numero,
                  cle:action.key,
                  nbEtoile:action.payload.exportVal().nbEtoile
                
                }); 
                
              }
             
            })
            if(this.profs.length==0){
         
              window.alert('Pas de professeurs');
             }
             else{
               this.nav.navigateForward('/details-matiere/'+libelle);
             }
          });
          
           
       
       
     
      }
        

        

}

