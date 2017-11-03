import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import { Dish } from '../../shared/dish';
import { Observable } from 'rxjs/Observable';
import { DishProvider } from '../dish/dish';
import { Storage } from "@ionic/storage";
import { LocalNotifications } from '@ionic-native/local-notifications';


/*
  Generated class for the FavoriteProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class FavoriteProvider {

  favorites: Array<any>;


  constructor(public http: Http,
    private dishservice: DishProvider,
    private storage: Storage,
    private localnotications: LocalNotifications) {
    console.log('Hello FavoriteProvider Provider');
    //make the array non null
    this.storage.get("favorites")
      .then(favorites => {
        this.favorites = favorites || [];
     })
  }

  addFavorite(id: number): boolean {
    if (!this.isFavorite(id)) {
  	  this.favorites.push(id);
      this.storage.set("favorites", this.favorites);


      this.localnotications.schedule({
        id: id,
        text: 'Dish ' + id + ' added as a favorite successfully!'
      });
    }
  	return true;
  }

  isFavorite(id: number): boolean {
  	return this.favorites.some(el => el===id);
  }
  getFavorites(): Observable<Dish[]> {
    //takes the favorites array and 
    //matches it up to every dish id 
    //filtering out the non-favorites 
    //from our dishes array 
    //then maps it to our observable 
    return this.dishservice.getDishes()
      .map(dishes=> dishes.filter(
        dish => this.favorites.some(el => el === dish.id)
       )
      )
  }

  deleteFavorite( id: number): Observable<Dish[]> {
    //removes the favorite from our favorites array 
    //updates our observable 
    //by calling the getFavorites
    let index = this.favorites.indexOf(id);
    if (index>= 0) {
      this.favorites.splice(index,1);
      this.storage.set("favorites", this.favorites);
      return this.getFavorites();
    }
    else {
      console.log('Deleting non-existant favorite', id);
      return Observable.throw('Deleting non-existant favorite' + id);

    }
  } 
}
