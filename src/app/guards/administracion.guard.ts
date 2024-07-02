import { Injectable } from "@angular/core";
import { Router } from "@angular/router";

@Injectable({
  providedIn: 'root'
})
export class AdministracionGuard {
  constructor(private direccionador: Router) {}

  
  // Este método vai ser o que determine se a ruta é accesible ou non
  canActivate(): boolean {
    if (typeof window !== "undefined") {//Para asegurarnos que lo renderiza el navegador y no de un error de "window is not defined"
      const usuarioRecuperado = window.sessionStorage.getItem('usuario'); // Recuperamos el usuario logueado del sessionstorage
      if(usuarioRecuperado) {
        const usuarioParseado = JSON.parse(usuarioRecuperado);
        if(usuarioParseado.rol != "administrador") { // Si no tiene Rol = administrador, lo redireccionamos a /portada
          this.direccionador.navigate(['/portada']);
          return false;
        } 
        return true;
      } else {
        this.direccionador.navigate(['/login']); // Si no se ha recuperado ningún usuario, redirecciona a login
        return false;
      }
    }else return false;
  }
}


