import { Injectable } from "@angular/core";
import { Headers, Http, Response } from "@angular/http";
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';

import { LoginModel } from "../models/Login.model";

const baseHTTPurl: string = 'http://192.168.99.100:8080';

@Injectable()
export class AuthenticationService {
    public token: string;
    public username: string;
  
  	constructor(private http: Http) {
      // set token if saved in session storage
      var currentUser = JSON.parse(sessionStorage.getItem('currentUser'));
      this.token = currentUser && currentUser.token;
    }

    login(currentUser: LoginModel): Observable<boolean> {
    	const headers = new Headers({'Content-Type':'application//x-www-form-urlencoded; charset=UTF-8'});
    	return this.http.post(
      		baseHTTPurl+'/authentication/login.php',
      		currentUser,
      		{headers: headers})
        .map((response: Response) => {     
          if(response.json() && response.json().body) 
          {  // user exists, login
            this.token = response.json().body.token;
            let currentUsername = currentUser.username;
            sessionStorage.setItem('currentUser', JSON.stringify({username: currentUser.username, token: this.token}));
            return true;
          }else{  // user not found, not login
            sessionStorage.removeItem('currentUser');
            return false;
          }
        });
    } 

    logout(): void {
      this.token = null;
      sessionStorage.removeItem('currentUser');
    } 
}
