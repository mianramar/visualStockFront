import { Component, Input, OnInit } from '@angular/core';
import { LoginService } from '../servicios/servizo-login.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Usuario } from '../modelos/usuario';
import { Subscription } from 'rxjs';


@Component({
  selector: 'app-cabecera',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './cabecera.component.html',
  styleUrl: './cabecera.component.css'
})

export class CabeceraComponent implements OnInit{

  usuarioCabecera : Usuario ={  //Inicializamos variable usuario
    email: '',
    password: '',
    rol: ''
  } as Usuario;

  private usuarioSubscripcion: Subscription;

  constructor(private servizoLogin: LoginService, private direccionador: Router) {
    
  }

  desconectar(){
      this.servizoLogin.logout().subscribe((data: any) => {//Llamamos al servicio login y logout para desconectar el usuario
        this.servizoLogin.clearSessionStorage();//limpiamos los datos de sesion
        this.direccionador.navigate(['/login']);
      });
  }

  verPerfil(){ //navegamos a verPerfil
      this.direccionador.navigate(['/perfil']);
}

  ngOnInit(): void {

    this.usuarioSubscripcion = this.servizoLogin.usuario$.subscribe(
      usuario => { //cambiamos el valor de usuario cuando desde servizoLoginUsuario cambia el valor
        this.usuarioCabecera = usuario;
      }
    );
  }


}
