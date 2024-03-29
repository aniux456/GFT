import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoadingController } from '@ionic/angular';
import { UserServiceService } from '../services/user-service.service';

@Component({
  selector: 'app-new-account',
  templateUrl: './new-account.page.html',
  styleUrls: ['./new-account.page.scss'],
})
export class NewAccountPage implements OnInit {

  tipoCuenta = new FormControl('', [Validators.required]);
  addAccountForm: FormGroup;
  userId: any;
  message: string;
  jwt: any;
  catCuentas: any = [];

  constructor(private formBuilder: FormBuilder, private router: Router, public newUserService: UserServiceService, public loadingController: LoadingController) { 
    this.addAccountForm = this.formBuilder.group({
      tipoCuenta: this.tipoCuenta
    });
  }

  async presentLoading() {
    const loading = await this.loadingController.create({
      message: 'Por favor esepera'
    });
    await loading.present();
    const { role, data } = await loading.onDidDismiss();
    console.log('Loading dismissed!');
  }

  ngOnInit() {
    this.jwt = localStorage.getItem("jwt");
    this.message = "";
    if (this.jwt) {
      this.presentLoading();
      this.newUserService.getCatCuentas(this.jwt).subscribe(
        (data: any) => { // Success
          this.catCuentas = data.response.type_cards;
          console.log(this.catCuentas);
          this.loadingController.dismiss();
        },
        (error) =>{
          this.loadingController.dismiss();
          console.error(error);
        }
      );
      this.userId = localStorage.getItem("id");
    } else {
      localStorage.clear();
      this.router.navigate(['/home']);
    }
  }

  saveAccount() {
    this.presentLoading();
    let data = { userId: this.userId,
      type: this.tipoCuenta.value.type,
      name: this.tipoCuenta.value.name }
    this.newUserService.addAccount( data, this.jwt).subscribe(
      (data: any) => { // Success
        this.loadingController.dismiss();
        console.log("data: ", data);
        this.message = data.success;
        this.tipoCuenta.setValue("");
      },
      (error) =>{
        this.loadingController.dismiss();
        console.error(error);
      }
    );
  }

  close() {
    localStorage.clear();
    this.router.navigate(['/home']);
  }

  regresar() {
    this.router.navigate(['/cuentas']);
  }
}
