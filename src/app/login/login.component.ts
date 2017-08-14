import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { MdSnackBar } from '@angular/material';

import { AuthenticationService } from "../services/authentication.service";
import { LoginModel } from "../models/Login.model";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

	@ViewChild('loginForm') loginForm: NgForm;
	currentUser = {
		username: '',
		password: ''
	}

  	constructor(
  		private authenticationService: AuthenticationService,
  		private router: Router,
  		private snackBar: MdSnackBar
  	) { }

  	ngOnInit() {
  	}

  	onSubmit() {
  		this.currentUser.username = this.loginForm.value.username;
  		this.currentUser.password = this.loginForm.value.password;

  		this.authenticationService.login(this.currentUser)
  			.subscribe(result => {
  				if(result == true) {
  					this.router.navigate(['/hotesse']);
  				}else{
  					this.snackBar.open('Username or password is incorrect!', '', {
						  duration: 2000
					  }); 
  				}
  			});

  		this.loginForm.reset();
  	}
}
