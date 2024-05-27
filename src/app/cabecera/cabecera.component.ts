import { Component, Input, OnInit } from '@angular/core';
import { LoginService } from '../servicios/servizo-login.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Usuario } from '../modelos/usuario';


@Component({
  selector: 'app-cabecera',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './cabecera.component.html',
  styleUrl: './cabecera.component.css'
})

export class CabeceraComponent implements OnInit{

  usuarioCabecera : Usuario ={  
    usuario: '',
    contrasinal: '',
    rol: ''
  } as Usuario;
  // Indicamos en el constructor los servicios necesarios para poder hacer el logout()
  constructor(private servizoLogin: LoginService, private direccionador: Router) {
    
  }

  desconectar(){
    this.servizoLogin.logout();
  }

    // Este método execútase cando a compoñente está lista para ser cargada. Vainos permitir suscribirnos aos cambios do usuario logeado
  ngOnInit(): void {
    this.servizoLogin.getUsuarioLogeado$().subscribe((usuario) => {
      this.usuarioCabecera = usuario;
    }); // Facemos que o usuarioCabecera cambie cada vez que cambia o usuario logeado
  }
}
