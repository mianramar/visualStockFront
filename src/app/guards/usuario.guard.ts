import { Injectable } from "@angular/core";
import { Router } from "@angular/router";

@Injectable({
  providedIn: 'root'
})
export class UsuarioGuard {
  constructor(private direccionador: Router) {}

  
  // Este método vai ser o que determine se a ruta é accesible ou non
  canActivate(): boolean {
    const usuarioRecuperado = window.sessionStorage.getItem('usuario'); // Recuperamos el usuario logueado
    if(usuarioRecuperado) {
      return true;
    } else {
      this.direccionador.navigate(['/login']); // Si no se ha recuperado ningún usuario, redirecciona a login
      return false;
    }
  }
}


