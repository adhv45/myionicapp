import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Geolocation } from '@ionic-native/geolocation';


/**
 * Generated class for the SecondPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-second',
  templateUrl: 'second.html',
})
export class SecondPage {
  username:string;
  lat:number;
  long:number;
  constructor(public navCtrl: NavController, public navParams: NavParams, private geolocation: Geolocation) {

    this.geolocation.getCurrentPosition().then((resp) => {
      this.lat=resp.coords.latitude
      this.long=resp.coords.longitude
    }).catch((error) => {
      console.log('Error getting location', error);
    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SecondPage');
    this.username=this.navParams.get("username");
  }

}
