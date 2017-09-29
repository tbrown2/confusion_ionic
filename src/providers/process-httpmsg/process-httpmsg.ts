import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Http, Response } from '@angular/http';

import 'rxjs/add/operator/map';
import 'rxjs/add/observable/throw';



/*
  Generated class for the ProcessHttpmsgProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
//provides 2 methods for other providers to be able to 
//process message from the server side
export class ProcessHttpmsgProvider {

  constructor(public http: Http) {
  	 console.log('Hello ProcessHttpmsgProvider Provider');
  }
 
//takes response and extracts data from response
  public extractData (res: Response) {
  	let body = res.json();
  	return body || { };
  }
//processes incoming error message and extracts the body from the 
//error message
public handleError (error: Response | any) {
	let errMsg: string;

	if (error instanceof Response) {
		const body = error.json() || '';
		const err = body.error || JSON.stringify(body);
		//use back quotes explained here: 
		//https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Template_literals
		errMsg = `${error.status} - ${error.statusText} || ''} ${err}`;
	}
	else {
		errMsg = error.message ? error.message: error.toString();
	}
	console.log(errMsg);
	return Observable.throw(errMsg);
 }
}
