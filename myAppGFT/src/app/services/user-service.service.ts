import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UserServiceService {

  constructor(private http: HttpClient) { }

  creatUser(data: any) {
    let headers = { "headers": {"Content-Type": "application/json"} };
    return this.http.post(environment.crearUsuario, JSON.stringify(data), headers);
  }

  loggin(data: any) {
    console.log("loggin");
    let headers = { "headers": {"Content-Type": "application/json"} };
    return this.http.post(environment.logginUsuarios, JSON.stringify(data), headers);
  }

  getAccounts(data: any) {
    let headers = { "headers": {"Content-Type": "application/json", "X-access-token": data} };
    return this.http.get(environment.cuentas, headers);
  }

  getCatCuentas(data: any) {
    let headers = { "headers": {"Content-Type": "application/json", "X-access-token": data} };
    return this.http.get(environment.catCuentas, headers);
  }

  addAccount(data:any, jwt: any) {
    let headers = { "headers": {"Content-Type": "application/json", "X-access-token": jwt} };
    return this.http.post(environment.cuentas, JSON.stringify(data), headers);
  }
}
