import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { JwtHelperService } from '@auth0/angular-jwt';
import { UserServiceService } from '../services/user-service.service';

const helper = new JwtHelperService();

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})

export class HomePage {

  logginForm: FormGroup;
  email = new FormControl('', [Validators.required, Validators.pattern(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/)]);
  password = new FormControl('', [Validators.required]);
  message = "";
  error: boolean;

  constructor(private formBuilder: FormBuilder, private router: Router, public newUserService: UserServiceService) {
    this.logginForm = this.formBuilder.group({
      email: this.email,
      password: this.password
    });
  }

  newAccount() {
    this.router.navigateByUrl('new-user');
  }

  loggin() {
    console.log("loggin prepara datos");
    let params = { email: this.email.value,
      password: this.password.value }
    this.newUserService.loggin(params).subscribe(
      (data: any) => { // Success
        console.log("data: ", data);
        localStorage.setItem("jwt", data.token);
        const decodedToken = helper.decodeToken(data.token);
        console.log(decodedToken);
        localStorage.setItem("id", decodedToken.id);
        this.router.navigateByUrl('cuentas');
      },
      (error) =>{
        console.error(error);
        this.message = error.error.message;
        this.error = true;
      }
    );
  }
}
