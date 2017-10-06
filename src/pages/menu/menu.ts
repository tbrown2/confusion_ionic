import { Component, OnInit, Inject } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';
import { Dish } from '../../shared/dish';
import { DishProvider } from '../../providers/dish/dish';
import { DishdetailPage } from '../dishdetail/dishdetail';
import { FavoriteProvider } from '../../providers/favorite/favorite';


/**
 * Generated class for the MenuPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-menu',
  templateUrl: 'menu.html',
})
export class MenuPage implements OnInit {

  dishes: Dish[];
  errMess: string;

  constructor(public navCtrl: NavController, 
  	public navParams: NavParams,
  	private dishservice: DishProvider,
  	@Inject('BaseURL') private BaseURL,
    private favoriteservice: FavoriteProvider,
    private toastCtrl: ToastController) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad MenuPage');
  }

  ngOnInit() {
  	this.dishservice.getDishes()
  	.subscribe(
  		dishes => this.dishes = dishes,
  		errmess => this.errMess = errmess
  	);
  }

  dishSelected(event, dish) {
    //not using event at all
    //makes dish detail page as the child page
    //sending it nav parameters so it knows which  
    //dish we are selecting
    //the dish detail page reads this as a navParams.get('dish')
    this.navCtrl.push(DishdetailPage, {
      dish: dish
    });
  }

  addToFavorites(dish: Dish) {
    console.log("adding to favorites", dish.id)
    this.favoriteservice.addFavorite(dish.id);
    this.toastCtrl
      .create({
        message: 'Dish ' + dish.name + " added as a favorite successfully!",
        duration: 3000,
      })
      .present();
  } 

}
