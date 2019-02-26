import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { LoadingController } from '@ionic/angular';
import { UserServiceService } from '../services/user-service.service';

@Component({
  selector: 'app-new-user',
  templateUrl: './new-user.page.html',
  styleUrls: ['./new-user.page.scss'],
})
export class NewUserPage implements OnInit {

  newUsrForm: FormGroup;
  email = new FormControl('', [Validators.required, Validators.pattern(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/)]);
  password = new FormControl('', [Validators.required]);
  nombre = new FormControl('', [Validators.required, Validators.pattern(/^[a-zA-ZñÑ ]*$/)]);
  apellido = new FormControl('', [Validators.required, Validators.pattern(/^[a-zA-ZñÑ ]*$/)]);
  message: string;
  error: boolean;
  constructor(private formBuilder: FormBuilder, public newUserService: UserServiceService, private router: Router, public loadingController: LoadingController) { 
    this.newUsrForm = this.formBuilder.group({
      email: this.email,
      password: this.password,
      nombre: this.nombre,
      apellido: this.apellido
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
    this.message = "";
  }

  goToLoggin() {
    this.router.navigate(['/home']);
  }

  newUser(){
    this.presentLoading();
    let params = { email: this.email.value, 
      firstname: this.nombre.value,
      lastname: this.apellido.value,
      password: this.password.value }
    this.newUserService.creatUser(params).subscribe(
      (data: any) => { // Success
        this.loadingController.dismiss();
        console.log("data creatUser: ", data);
        this.message = data.success;
        this.error = false;
      },
      (error) =>{
        this.loadingController.dismiss();
        console.error(error);
        this.message = error.error.message;
        this.error = true;
      }
    );
  }
}
