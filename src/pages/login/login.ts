import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { Storage } from '@ionic/storage';
import { User } from '../../shared/user';

/**
 * Generated class for the LoginPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {

  loginForm: FormGroup;
  user: User = {username: '', password: ''};

  //inject formbuilder, view controller, and storage
  constructor(public navCtrl: NavController, public navParams: NavParams,
  	private viewCtrl: ViewController,
  	private formBuilder: FormBuilder,
  	private storage: Storage) {

  	this.loginForm = this.formBuilder.group({
        username: ['', Validators.required],
        password: ['',Validators.required],
        remember: true
      });
  	//looking in our internal storage 
  	//if the user already has logged into the application on the device
  	//and has ticked the "remember" box
  	//the information will be saved and presented
  	storage.get('user').then(user => {
  		//means the user is available
        if (user) {
          console.log(user);
          this.user = user;
          this.loginForm
            .patchValue({
              'username': this.user.username, 
              'password': this.user.password 
            });
        }
        else
          console.log('user not defined');
      });

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
  }

  dismiss() {
  	//dismiss the modal
  	this.viewCtrl.dismiss();

  }

  onSubmit(){
  	//this is how we get the username fields
  	this.user.username = this.loginForm.get('username').value;
  	this.user.password = this.loginForm.get('password').value;

  	//checkbox when ticked by user will tell us that we need to save the 
  	//username and password
  	if (this.loginForm.get('remember').value){
  		this.storage.set('user', this.user);
  	}
  	else 
  		this.storage.remove('user');
  	this.viewCtrl.dismiss();
  }

}
