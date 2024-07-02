import { Injectable } from '@angular/core';
import { Usuario } from '../modelos/usuario';
import { BehaviorSubject, Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { Token } from '../modelos/token';

@Injectable({
  providedIn: 'root'
})
export class UsuariosService {


  constructor(private direccionador: Router, private httpClient: HttpClient) {
  }

  private getHeaders(): HttpHeaders {
    let headers = new HttpHeaders();
    const usuarioRecuperado = window.sessionStorage.getItem('usuario'); // Recuperamos el usuario logueado
    if(usuarioRecuperado) {
      const usuarioParseado = JSON.parse(usuarioRecuperado);
      headers = headers.set('Authorization', `Bearer ${usuarioParseado.accessToken}`);
    }
    return headers;
  }

  getUsuarios$() :Observable<any>{
    const headers = this.getHeaders();
    return this.httpClient.get<any>( 'http://localhost:8000/api/usuarios', { headers }); //llamada get a apiUsuarios
  }

  getUsuario$(id: number) :Observable<any>{
    const headers = this.getHeaders();
    return this.httpClient.get<any>( 'http://localhost:8000/api/usuarios/' + id, { headers }); //llamada get a apiUsuarios
  }

  engadirUsuario(pUsuario: Usuario) {

    const headers = this.getHeaders();

    return this.httpClient.post<Usuario>( 'http://localhost:8000/api/usuarios', pUsuario, { headers });//llamada post a apiUsuarios pasando el usuario en el cuerpo

  }

  editarUsuario(id: number, usuario:Usuario) :Observable<any> {
    const headers = this.getHeaders();

    return this.httpClient.put<any>( 'http://localhost:8000/api/usuarios/' + id, usuario, { headers });//llamada put a apiUsuarios pasando el usuario en el cuerpo
  }

  eliminarUsuario(id: number) {
    const headers = this.getHeaders();

    return this.httpClient.delete<any>( 'http://localhost:8000/api/usuarios/' + id, { headers }); //llamada delete a apiUsuarios 
  }

  public editarImagen(imagen: File): Observable<any> {
    const headers = this.getHeaders();

    const formData = new FormData(); //creamos nuevo Formdata
    formData.append('archivo', imagen, imagen.name); // 'archivo' es el nombre del campo en la petición


    return this.httpClient.post('http://localhost:8000/api/editarimagen/', formData, { headers }); //llamada post a apieditar imagen pasando el formadata en el cuerpo
  }


}