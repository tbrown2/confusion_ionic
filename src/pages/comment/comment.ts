import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';
import {Validators, FormBuilder, FormGroup } from '@angular/forms';
import { Comment } from '../../shared/comment';
/**
 * Generated class for the CommentPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-comment',
  templateUrl: 'comment.html',
})
export class CommentPage {

  commentForm: FormGroup;
  comment: Comment;

  constructor(public navCtrl: NavController, 
  	public navParams: NavParams,
  	public viewCtrl: ViewController,
    private formBuilder: FormBuilder) {

  	this.commentForm = this.formBuilder.group({
        rating: 5,
        author: "",
        comment: "",
        date: ""
      });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CommentPage');
  }

    close() { 
    this.comment = this.commentForm.value;
  	//used to dismiss the modal
  	//modal in ionic supports this method
  	this.viewCtrl.dismiss(this.comment);
  }

  onSubmit() {
  	var d = new Date();
    this.comment = this.commentForm.value;
    this.comment.date = d.toISOString();

    //so we know that the information is captured correctly 
    console.log(this.commentForm.value);
    this.viewCtrl.dismiss(this.comment);
  }

}
