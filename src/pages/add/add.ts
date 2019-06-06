import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, LoadingController } from 'ionic-angular';
import { Camera, CameraOptions } from '@ionic-native/camera';
import { Geolocation } from '@ionic-native/geolocation';

import * as firebase from 'firebase';
import 'firebase/firestore';
import 'firebase/auth';

@IonicPage()
@Component({
  selector: 'page-add',
  templateUrl: 'add.html',
})
export class AddPage {

  tipo='';
  copa='';
  tronco='';
  foto='';
  items=[];
  longitud=0;
  latitud=0;

  db: firebase.firestore.Firestore;
  user: firebase.User;
  storage: firebase.storage.Storage;

  constructor(private geolocation: Geolocation, public navCtrl: NavController, public navParams: NavParams, public alertCtr:AlertController,  public camera: Camera, public loading: LoadingController) {
    this.db= this.navParams.get('db');
    this.db= firebase.firestore();
    this.storage =firebase.storage();
    this.user = firebase.auth().currentUser;

    this.geolocation.getCurrentPosition().then((resp) => {
      this.latitud=resp.coords.latitude;
      this.longitud=resp.coords.longitude;
    }).catch((error) => {
      console.log('Error getting location', error);
    });

  }

  addDocument(collection:string, obj:any){
    this.db.collection(collection).add(obj)
    .then((res)=>{
      console.log('agregado');
      let alert = this.alertCtr.create(
        {
          title:"Éxito",
          subTitle: "Se agregó el árbol a la colección",
          buttons: ["OK"]
        }
      );
      alert.present();
      this.navCtrl.pop();
    })
    .catch((error)=>{
      console.log('error');
      console.log('agregado');
      let alert = this.alertCtr.create(
        {
          title:"Error",
          subTitle: "No es posible agregar el árbol a la colección",
          buttons: ["OK"]
        }
      );
    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AddPage');
  }

  agregar(){
  console.log(this.longitud, this.latitud,this.tipo, this.copa, this.tronco, this.foto);
  

    let loading = this.loading.create({content: "Subiendo Imagen..."});
    loading.present();

    let arbol ={
      latitud: this.latitud,
      longitud:this.longitud,
      tipo: this.tipo,
      copa:this.copa,
      tronco:this.tronco,
      user: this.user.uid,
      foto: ''
    }

    this.db.collection('arboles').add(arbol)
    .then(ref=>{
      let imagenNombre = ref.id;
      let uploadTask = this.storage.ref('arboles/' + imagenNombre + '.jpg').putString(this.foto, 'data_url');
0
      uploadTask.then(out=>{loading.dismiss(); let foto= out.downloadURL; ref.update({foto:foto});this.navCtrl.pop()})
      .catch(error=>{console.log('Error al subir la imagen');});

    })
    .catch(error=>{
      console.log(JSON.stringify(error))
    })
  }
    

  tfoto()
  {
    console.log('tomar foto');

    const options: CameraOptions = {
      quality:100,
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE
    }
    this.camera.getPicture(options)
    .then(foto => {
      this.foto= 'data:image/jpeg;base64,' + foto;
    
    }, error=>{
      console.log(JSON.stringify(error));
    });

  }


}
