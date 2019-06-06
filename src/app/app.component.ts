import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { HomePage } from '../pages/home/home';
import { LogInPage } from '../pages/log-in/log-in';
import * as firebase from 'firebase';

  export const config = {
    apiKey: "AIzaSyDgakB8KePECHyDlvcwcCBAJJSH_VUZe5U",
    authDomain: "mytree-137d2.firebaseapp.com",
    databaseURL: "https://mytree-137d2.firebaseio.com",
    projectId: "mytree-137d2",
    storageBucket: "mytree-137d2.appspot.com",
    messagingSenderId: "493904351832",
    appId: "1:493904351832:web:66eaf30aaffb88de"
};

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage:any = LogInPage;

  constructor(platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen) {
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      splashScreen.hide();
    });
    firebase.initializeApp(config);
  }
}

