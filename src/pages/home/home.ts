import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import * as firebase from 'firebase';
import 'firebase/firestore';
import 'firebase/auth';
import { AddPage } from '../add/add';

export const config ={
  apiKey: "AIzaSyDgakB8KePECHyDlvcwcCBAJJSH_VUZe5U",
    authDomain: "mytree-137d2.firebaseapp.com",
    databaseURL: "https://mytree-137d2.firebaseio.com",
    projectId: "mytree-137d2",
    storageBucket: "mytree-137d2.appspot.com",
    messagingSenderId: "493904351832",
    appId: "1:493904351832:web:66eaf30aaffb88de"
}

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  db: firebase.firestore.Firestore;
  items=[];
  user : firebase.User;
  add=AddPage;

  constructor(public navCtrl: NavController) {
    this.user= firebase.auth().currentUser;
    this.db = firebase.firestore();
  }
  ionViewDidEnter(){
    this.items = [];
    this.getDocuments('arboles');
  }

  getDocuments (collection:string)
  {
    this.db.collection(collection).where('user', '==', this.user.uid).get()
    .then(res=>{
      res.forEach((doc: any)=>{
        let dict={
          id: doc.id,
          'latitud':doc.data().latitud,
          'longitud':doc.data().longitud,
          'tipo':doc.data().tipo,
          'copa':doc.data().copa,
          'tronco':doc.data().tronco,
          'foto':doc.data().foto
        }
        this.items.push(dict);
      });
    })
    .catch((error:any)=>{
      console.log(JSON.stringify(error));
    });
  }

  addA(){
    this.navCtrl.push(this.add, {db:this.db});
  }

}
