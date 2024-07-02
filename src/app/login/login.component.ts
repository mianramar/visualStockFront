import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormGroup, ReactiveFormsModule, FormControl, Validators } from '@angular/forms';
import { Router, RouterOutlet } from '@angular/router';
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
  formSubmitted:boolean;

  constructor(private servizoLogin: LoginService, private direccionador: Router) {
    this.formularioLogin = new FormGroup({ //Inicializamos el formulario de login con sus validaciones
      email: new FormControl('', [Validators.required]),
      password: new FormControl('', [Validators.required])
    })
  }

  login(){ 
    this.formSubmitted = true;
    if (this.formularioLogin.valid) { //Si el formulario es valido
      const myStorage = window.sessionStorage;
      if (myStorage.getItem('usuario') == null) { 
        this.servizoLogin.comprobarLogin(this.formularioLogin.value).subscribe
        ({ //LLamamos a servizoLogin comprobarLogin para logearnos y obtener los datos del usuario
          next: (data) => {
            this.servizoLogin.setUsuario(data); //Llamamos a servizo login para setear los datos del usuario en el sessionstorage y avisar a suscriptores
            this.formSubmitted = false;
            this.direccionador.navigate(['/portada']); //Redireccionamos a portada
          },
          error: (error) => {
            // Mostramos el error
            window.alert("Usuario o contraseña incorrectos");
          }
        });
      }
    } else {
      this.mensajeError = 'Por favor, corrija los errores en el formulario.';
    }

  }
}
