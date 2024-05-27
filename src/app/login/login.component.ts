import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormGroup, ReactiveFormsModule, FormControl } from '@angular/forms';
import { RouterOutlet } from '@angular/router';
import { LoginService } from '../servicios/servizo-login.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, RouterOutlet, ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'  
})
export class LoginComponent {
  formularioLogin: FormGroup; // Definimos o FormGroup asociado ao noso formulario HTML
  // variables para mostrar los errores en el formulario
  mensajeError:string;

  constructor(private servizoLogin: LoginService) {
    this.formularioLogin = new FormGroup({
      usuario: new FormControl(),
      contrasinal: new FormControl()
    })
  }

  // Cojer los campos del formulario (nome y contraseña)
  login(){
    this.mensajeError=this.servizoLogin.comprobarLogin(this.formularioLogin.value);
  }
}
