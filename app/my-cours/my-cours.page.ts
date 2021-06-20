import { Component, OnInit } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import { AlertController } from '@ionic/angular';
import { AngularFireAuth } from '@angular/fire/auth';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
export interface Nbstar {
  prenomProf:string,
          nomProf:string,
          matiere:string,
          telephone:string,
          cle:string
  
}
@Component({
  selector: 'app-my-cours',
  templateUrl: './my-cours.page.html',
  styleUrls: ['./my-cours.page.scss'],
})
export class MyCoursPage implements OnInit {
  rate:number;
userid:string;
cours=[];
etoiles:number;
clecle:string;
cledemande: string;
tab:any

  constructor(public afDB: AngularFireDatabase,private alertCtrl: AlertController,private afAuth: AngularFireAuth) { 
  
  }

  ngOnInit() {
    this.afAuth.authState.subscribe(async user =>{
      if (user) {
        this.userid=user.uid;
       // console.log(this.userid);
        
       this.getCours().subscribe(nbEtoiles =>{ 
          //console.log('ici',nbEtoiles);
          for(let etoile in nbEtoiles){
            //console.log(nbEtoiles[etoile].length)
            if(nbEtoiles[etoile].length!=0){
              console.log("fiiii nak")
              this.cours.push(nbEtoiles[etoile]);
              console.log(this.cours)
            }
          }

         
         
      

       }); 
      }
    })
    
  
  }

  getCours(): Observable<String[]> {
    
     return this.afDB.list('Demandes/').snapshotChanges(['child_added', 'child_removed']).pipe(
         map(actions => actions.map(action => 
           
              { 
                // console.log("action",action.key);
                // console.log("userid",this.userid);
                this.tab=[]
                if(action.payload.exportVal().cleUser==this.userid){
                  console.log("doug na")
             this.tab= action.payload.exportVal();
             this.tab.key=action.key
           
             console.log(this.tab);
             
            

                
                } else{
                  console.log('waw keey');
                }
                return(this.tab);
               
              }
             
             
           
           
            
           
         
         )));
       }

 
 
  leaveNote(crs):void{
    console.log('rate',this.rate);
    //console.log(crs.etoiles)
   
     let average:number=(Number(crs.etoiles) + Number(this.rate))/2;
    
    let arrondi: number=Math.ceil(average);
   // console.log(average);
    console.log(arrondi);
     


     this.afDB.list(`professeur/${crs.cleProf}`).set('nbEtoile',arrondi)
     this.afDB.list(`Demandes/${crs.key}`).set('etoiles',arrondi)
     this.message();



  }   
  onModelChange($event){
    console.log('event',$event)
  }
  async message(){

    const alert = await this.alertCtrl.create({
      
      
      message: 'Votre note a été bien prise en compte',
      buttons: ['OK']
    });
    await alert.present();
  
    
  }
  
}
