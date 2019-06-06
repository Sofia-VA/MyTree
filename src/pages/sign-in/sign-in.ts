import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import * as firebase from 'firebase';
import 'firebase/auth';

@IonicPage()
@Component({
  selector: 'page-sign-in',
  templateUrl: 'sign-in.html',
})
export class SignInPage {
  email='';
  pwd='';
  auth: firebase.auth.Auth;

  constructor(public navCtrl: NavController, public navParams: NavParams, public alertCtrl: AlertController) {
    this.auth=firebase.auth();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SignInPage');
  }

  signin()
  {
    this.auth.createUserWithEmailAndPassword(this.email,this.pwd)
    .then(data=>{
      this.navCtrl.pop();
    })
    .catch(error=>{
      let alert = this.alertCtrl.create({
        title:"Error",
        subTitle: error.message,
        buttons: ['Ok']
      });
      alert.present();
    });
  }
  }
