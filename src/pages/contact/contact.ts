import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { EmailComposer } from '@ionic-native/email-composer';
import { CallNumber } from '@ionic-native/call-number';

/**
 * Generated class for the ContactPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-contact',
  templateUrl: 'contact.html',
})
export class ContactPage {

  constructor(public navCtrl: NavController,
   public navParams: NavParams,
   private emailcomposer: EmailComposer,
   private callnumber: CallNumber) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ContactPage');
  }

  sendEmail() {
  	//configuring a javascript object
  	//we have the luxury of using preformatted content
  	//in the body of the meail by making ishtml true
  	let email = {
  		to: 'confusion@food.net',
  		subject: '[Confusion]: Query',
  		body: 'Dear Sir/Madam',
  		isHtml: true
  	};
  	//calling our email composer and passing our email object into it
  	this.emailcomposer.open(email);
  }

  callNum() {
    console.log("calling...");
    this.callnumber.callNumber("85212346578", true)
      .then(() => console.log('Launched Dialer!'))
      .catch(() => console.log("Error Launching dialer..."));

  }

}
