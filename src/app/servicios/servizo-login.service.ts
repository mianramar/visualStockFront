import { Injectable } from '@angular/core';
import { Usuario } from '../modelos/usuario';
import { BehaviorSubject, Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { Token } from '../modelos/token';

@Injectable({
  providedIn: 'root'
})
export class LoginService {


  constructor(private direccionador: Router, private httpClient: HttpClient) {
  }

  //Hacemos del user un observable
  private usuarioSubject = new BehaviorSubject<Usuario>(this.getUsuarioFromSessionStorage());
  
  get usuario$() { //obtenemos el user como observable
    return this.usuarioSubject.asObservable();
  }

  private getUsuarioFromSessionStorage(): Usuario { //obtenemos el usuario del sessionstorage
    if (typeof window !== "undefined") {
      const usuario = window.sessionStorage.getItem('usuario');
      return usuario ? JSON.parse(usuario) : { email: '', password: '', rol: '' } as Usuario;
    } else return { email: '', password: '', rol: '' } as Usuario;
  }

  setUsuario(usuario: any) { //seteamos el usuario
    window.sessionStorage.setItem('usuario', JSON.stringify(usuario));
    this.usuarioSubject.next(usuario);
  }


  clearSessionStorage() { //limpiamos los valores del sessionstorage
    if (typeof window !== "undefined") {
      window.sessionStorage.clear();
      this.usuarioSubject.next({ email: '', password: '', rol: '' } as Usuario);
    }
  }



  //Metodos REST

  private getHeaders(): HttpHeaders {
    let headers = new HttpHeaders();
    const usuarioRecuperado = window.sessionStorage.getItem('usuario'); // Recuperamos el usuario logueado
    if(usuarioRecuperado) {
      const usuarioParseado = JSON.parse(usuarioRecuperado);
      headers = headers.set('Authorization', `Bearer ${usuarioParseado.accessToken}`);
    }
    return headers;
  }

  engadirUsuario(pUsuario: Usuario) {

    const headers = this.getHeaders();

    return this.httpClient.post<Usuario>( 'http://localhost:8000/api/usuarios', pUsuario, { headers }); //llamada post a apiUsuarios pasando el usuario en el cuerpo

  }


  setUsuarioLogeado(usuario: Usuario) {
    
  }

  
  modificarUsuario(pUsuario: Usuario, nombreAntiguo: string) {

  }

  borrarUsuario(pUsuario: Usuario) {

  }

  comprobarLogin(pUsuario: Usuario) {
    return this.httpClient.post<Token>( 'http://localhost:8000/api/loginAPI', pUsuario); //llamada post a loginApi pasando los datos en el cuerpo
  }

  logout(): any {
    const headers = this.getHeaders();
    return this.httpClient.post<any>( 'http://localhost:8000/api/logoutAPI',{},  { headers }); //llamada post a logoutApi con cuerpo vacio
  }
}

