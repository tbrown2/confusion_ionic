import { Component, OnInit, Inject } from '@angular/core';
import { IonicPage, NavController, NavParams, ItemSliding, 
         LoadingController, ToastController, AlertController } from 'ionic-angular';
import { FavoriteProvider } from '../../providers/favorite/favorite';
import { Dish } from '../../shared/dish';
/**
 * Generated class for the FavoritesPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-favorites',
  templateUrl: 'favorites.html',
})
export class FavoritesPage implements OnInit {

  favorites: Dish[];
  errMess: string;

  constructor(public navCtrl: NavController, 
  	public navParams: NavParams,
  	private favoriteservice: FavoriteProvider,
  	@Inject('BaseURL') private BaseURL,
    private toastCtrl: ToastController,
    private loadCtrl: LoadingController,
    private alertCtrl: AlertController) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad FavoritesPage');
  }

  ngOnInit() {
  	
  	this.favoriteservice.getFavorites()
  	.subscribe(favorites => this.favorites = favorites,
  		errMess => this.errMess = errMess);
  }

  deleteFavorite (item: ItemSliding, id: number) {
  	console.log('delete', id);

    //creating an alert , but also defining the results within the object 
    //through usage of arrow functions 

    let alert = this.alertCtrl.create({
      title: 'Confirm',
      message: "Are you sure you want to delete from your favorites?",
      buttons: 
      [
        {
           text: 'Cancel',
           role: 'Cancel',
           handler: () => {
             console.log('Delete cancelled')
           }
        },

        {
          text: 'Delete',
          handler: () => {
             //converting loadCtrl return into an object
            let loading = this.loadCtrl.create({
              content: "Deleting....",

            });
            //returning toast as an object
            let toast = this.toastCtrl
              .create({
              message: 'Dish ' + id + ' deleted successfully',
              duration: 3000,
            })
            loading.present();

            this.favoriteservice.deleteFavorite(id)
              //subscribe success, then error
              .subscribe(
              favorites => {
                            this.favorites = favorites;
                            loading.dismiss();
                            toast.present();
                           }
                ,
              errMess => { 
                           this.errMess = errMess;
                           loading.dismiss(); 
                         }
               );
          }
        }
      ]
    });

    //after creating the alert object we must resent the object to the user
    alert.present();
  	item.close();
  }

}
