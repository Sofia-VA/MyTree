import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { HomePage } from '../home/home';
import { SignInPage } from '../sign-in/sign-in';

import * as firebase from 'firebase';
import 'firebase/auth';

@IonicPage()
@Component({
  selector: 'page-log-in',
  templateUrl: 'log-in.html',
})
export class LogInPage {
  home=HomePage;
  SignIn=SignInPage;
  email='';
  pwd='';
  auth: firebase.auth.Auth;

  constructor(public navCtrl: NavController, public navParams: NavParams,public alertCtrl: AlertController) {
    this.auth =firebase.auth();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LogInPage');
  }

  login(){
    //this.navCtrl.push(this.home);
    console.log(this.email, this.pwd);
    this.auth.signInWithEmailAndPassword(this.email,this.pwd)
    .then(data=>{
      this.navCtrl.setRoot(this.home);
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
  signin(){
    this.navCtrl.push(this.SignIn);
  }
}
