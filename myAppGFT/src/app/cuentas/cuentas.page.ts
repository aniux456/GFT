import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserServiceService } from '../services/user-service.service';

@Component({
  selector: 'app-cuentas',
  templateUrl: './cuentas.page.html',
  styleUrls: ['./cuentas.page.scss'],
})
export class CuentasPage implements OnInit {

  jwt: any;
  cuentas:any = [];
  catCuentas: any = [];
  agregarCuenta: boolean = false;
  userId: any;
  message = "";

  constructor(private router: Router, public newUserService: UserServiceService) { }

  ngOnInit() {
    this.jwt = localStorage.getItem("jwt");
    console.log(this.jwt);
    /* this.newUserService.getAccounts(this.jwt).subscribe(
      (data: any) => { // Success
        console.log("data: ", data);
        this.cuentas = data.response;
        console.log(this.cuentas);
      },
      (error) =>{
        console.error(error);
      }
    ); */
    this.cuentas = [{ _id: "5b9fe477c68dcf0c5b12a384", name: "Tarjeta de Credito", type: "TDC", userId: "34534f543f345r3", deposits: 0, withdrawals:0, balance: 0}, { _id: "5b9fe477c435f345ffa384", name: "Tarjeta de Debito", type: "TDD", userId: "34534f543f345r3", deposits: 0, withdrawals:0, balance: 0}]
    this.newUserService.getCatCuentas(this.jwt).subscribe(
      (data: any) => { // Success
        console.log("data: ", data);
        this.catCuentas = data.response.type_cards;
        console.log(this.catCuentas);
      },
      (error) =>{
        console.error(error);
      }
    );
  }

  addAccount() {
    this.agregarCuenta = true;
    this.userId = localStorage.getItem("id");
  }

  saveAccount() {
    let data = { userId: this.userId,
      type: "TDD",
      name: "Tarjeta de Debito" }
    this.newUserService.addAccount( data, this.jwt).subscribe(
      (data: any) => { // Success
        console.log("data: ", data);
        this.agregarCuenta = false;
        this.message = data.success;
      },
      (error) =>{
        console.error(error);
      }
    );
  }
}
