import { Injectable } from '@angular/core';
import { Entrada } from '../modelos/entrada';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class EntradasService {

  constructor(private httpClient: HttpClient) {

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

  getEntradas$() :Observable<any>{
    const headers = this.getHeaders();
    return this.httpClient.get<any>( 'http://localhost:8000/api/albarans?tipo=entrada', { headers });//llamada get a apiAlbarans pasando el tipo como parametro
  }

  // Este método permitirá dar de alta novos usuarios ao tempo que informará aos suscriptores das novidades
  engadirEntrada(pEntrada: Entrada):Observable<any> {
    const headers = this.getHeaders();

    return this.httpClient.post<any>( 'http://localhost:8000/api/albarans', pEntrada, { headers });//llamada post a apiAlbarans pasando la entrada en el cuerpo
  }

  verDetalle(id: number) :Observable<any> {
    const headers = this.getHeaders();

    return this.httpClient.get<any>( 'http://localhost:8000/api/albarans/' + id, { headers });//llamada get a apiAlbarans 
  }

  editarEntrada(id: number, entrada:Entrada) :Observable<any> {
    const headers = this.getHeaders();

    return this.httpClient.put<any>( 'http://localhost:8000/api/albarans/' + id, entrada, { headers }); //llamada put a apiAlbarans pasando la entrada en el cuerpo
  }

  eliminarEntrada(id: number) {
    const headers = this.getHeaders();

    return this.httpClient.delete<any>( 'http://localhost:8000/api/albarans/' + id, { headers }); //llamada delete a apiAlbarans 
  }

}
