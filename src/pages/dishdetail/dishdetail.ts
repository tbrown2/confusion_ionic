import { Component, Inject, OnInit } from '@angular/core';
import { IonicPage, NavController, NavParams, 
         ToastController, ActionSheetController, ModalController } from 'ionic-angular';
import { Dish } from '../../shared/dish';
import { Comment } from '../../shared/comment';
import { FavoriteProvider } from '../../providers/favorite/favorite';
import { CommentPage } from '../../pages/comment/comment';
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
  favorite: boolean = false;


  constructor(public navCtrl: NavController, 
  	public navParams: NavParams,
  	@Inject('BaseURL') private BaseURL,
    private favoriteservice: FavoriteProvider,
    private toastCtrl: ToastController,
    private actionCtrl: ActionSheetController,
    private modalCtrl: ModalController) {

  		this.dish = navParams.get('dish');
      this.favorite = this.favoriteservice.isFavorite(this.dish.id);
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

  addToFavorites() {
    console.log("adding to favorites", this.dish.id);
    this.favorite = this.favoriteservice.addFavorite(this.dish.id);
    this.toastCtrl
      .create({
        message: this.dish.name + " added as a favorite!",
        duration: 3000,
        position: 'middle',
      })
      .present();
  } 

  options() {
    let actionSheet = this.actionCtrl.create({
      title: "Select Actions",
      buttons: 
      [
        {
          text: "Add To Favorites",
          handler: () => this.addToFavorites()
        },

        {
          text: "Add Comment",
          handler: () => this.openComment()
        },

        {
          text: "Cancel",
          role: "Cancel",
          handler: () => {
            console.log("cancel clicked");
          }
        }
      ],
    });

    actionSheet.present();
  }

    openComment() {
    //turn the reservation page into a modal
    let modal = this.modalCtrl.create(CommentPage);
    modal.onDidDismiss( comment => {
      if (comment.date != "")
      this.dish.comments.push(comment);
      else 
       return;
    });
    modal.present();
  }


}
