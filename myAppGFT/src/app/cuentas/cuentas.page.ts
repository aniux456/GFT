import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoadingController } from '@ionic/angular';
import { UserServiceService } from '../services/user-service.service';

@Component({
  selector: 'app-cuentas',
  templateUrl: './cuentas.page.html',
  styleUrls: ['./cuentas.page.scss'],
})
export class CuentasPage implements OnInit {

  jwt: any;
  cuentas:any;
  sinCuentas: boolean;
  
  constructor(private router: Router, public newUserService: UserServiceService, public loadingController: LoadingController) { }

  async presentLoading() {
    const loading = await this.loadingController.create({
      message: 'Por favor esepera'
    });
    await loading.present();
    const { role, data } = await loading.onDidDismiss();
    console.log('Loading dismissed!');
  }

  ngOnInit() {
    this.cuentas = [];
    this.jwt = localStorage.getItem("jwt");
    if (this.jwt) {
      this.presentLoading();
      this.newUserService.getAccounts(this.jwt).subscribe(
        (data: any) => { // Success
          this.cuentas = data.response;
          console.log(this.cuentas);
          if(this.cuentas.length == 0)
            this.sinCuentas = true;
          this.loadingController.dismiss();
        },
        (error) =>{
          this.loadingController.dismiss();
          console.error(error);
        }
      );
      //this.cuentas = [{ _id: "5b9fe477c68dcf0c5b12a384", name: "Tarjeta de Credito", type: "TDC", userId: "34534f543f345r3", deposits: 0, withdrawals:0, balance: 0}, { _id: "5b9fe477c435f345ffa384", name: "Tarjeta de Debito", type: "TDD", userId: "34534f543f345r3", deposits: 0, withdrawals:0, balance: 0}]
    } else {
      localStorage.clear();
      this.router.navigateByUrl('home');
    }
  }

  addAccount() {
    this.router.navigateByUrl('new-account');
  }

  close() {
    localStorage.clear();
    this.router.navigateByUrl('home');
  }

}
