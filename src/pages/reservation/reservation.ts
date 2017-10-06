import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';
import {Validators, FormBuilder, FormGroup } from '@angular/forms';

/**
 * Generated class for the ReservationPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-reservation',
  templateUrl: 'reservation.html',
})
export class ReservationPage {
  //this is our reservation form 
  reservation: FormGroup;
  //injecting our FormBuilder into our constructor
  //create the form into the constructor
  constructor(public navCtrl: NavController, public navParams: NavParams,
    public viewCtrl: ViewController,
    private formBuilder: FormBuilder ) {

      this.reservation = this.formBuilder.group({
        guests: 3,
        smoking: false,
        dateTime: ['', Validators.required],
      });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ReservationPage');
  }

  dismiss() { 
  	//used to dismiss the modal
  	//modal in ionic supports this method
  	this.viewCtrl.dismiss();
  }

  onSubmit() {
    //so we know that the information is captured correctly 
    console.log(this.reservation.value);
    this.viewCtrl.dismiss();
  }

}
