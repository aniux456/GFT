import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { JwtHelperService } from '@auth0/angular-jwt';
import { UserServiceService } from '../services/user-service.service';
import { LoadingController } from '@ionic/angular';

const helper = new JwtHelperService();

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})

export class HomePage implements OnInit {

  logginForm: FormGroup;
  email = new FormControl('', [Validators.required, Validators.pattern(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/)]);
  password = new FormControl('', [Validators.required]);
  message: string;

  constructor(private formBuilder: FormBuilder, private router: Router, public newUserService: UserServiceService, public loadingController: LoadingController) {
    this.logginForm = this.formBuilder.group({
      email: this.email,
      password: this.password
    });
  }

  ngOnInit() {
    this.message = "";
  }

  async presentLoading() {
    const loading = await this.loadingController.create({
      message: 'Por favor esepera'
    });
    await loading.present();
    const { role, data } = await loading.onDidDismiss();
    console.log('Loading dismissed!');
  }

  newAccount() {
    this.router.navigateByUrl('new-user');
  }

  loggin() {
    console.log("loggin prepara datos");
    this.presentLoading();
    let params = { email: this.email.value,
      password: this.password.value }
    this.newUserService.loggin(params).subscribe(
      (data: any) => { // Success
        this.loadingController.dismiss();
        localStorage.setItem("jwt", data.token);
        const decodedToken = helper.decodeToken(data.token);
        localStorage.setItem("id", decodedToken.id);
        this.router.navigateByUrl('cuentas');
      },
      (error) =>{
        this.loadingController.dismiss();
        console.error(error);
        this.message = error.error.error;
      }
    );
  }
}
