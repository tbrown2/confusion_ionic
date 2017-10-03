import { Component, Inject, OnInit } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Dish } from '../../shared/dish';
import { Comment } from '../../shared/comment';

/**
 * Generated class for the DishdetailPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-dishdetail',
  templateUrl: 'dishdetail.html',
})
export class DishdetailPage {
  
  dish: Dish;
  errMess:string;
  avgstars: string;
  numComments: number;


  constructor(public navCtrl: NavController, 
  	public navParams: NavParams,
  	@Inject('BaseURL') private BaseURL) {

  		this.dish = navParams.get('dish');
  		this.numComments = this.dish.comments.length;

  		let total = 0;
  		//totals the star ratings
  		this.dish.comments.forEach(comment=> total += comment.rating);
  		//computes average
  		//computes value to string in fixed point notation
  		this.avgstars = (total/this.numComments).toFixed(2);

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad DishdetailPage');
  }

}
