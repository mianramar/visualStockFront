import { Injectable } from '@angular/core';
import * as salidasJson from '../../assets/salidas.json';
import { BehaviorSubject, Observable } from 'rxjs';
import { Salida } from '../modelos/salida';
import { HttpClient, HttpHeaders } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class SalidasService {

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

  getSalidas$(): Observable<Salida[]> {
    const headers = this.getHeaders();
    return this.httpClient.get<any>( 'http://localhost:8000/api/albarans?tipo=salida', { headers });//llamada get a apialbarans pasando el tipo como un parametro
  }

  engadirSalida(pSalida: Salida): Observable<any> {
    const headers = this.getHeaders();

    return this.httpClient.post<any>( 'http://localhost:8000/api/albarans', pSalida, { headers });//llamada post a apialbarans pasando la salida en el cuerpo
  }

  verDetalle(id: number) :Observable<any> {
    const headers = this.getHeaders();

    return this.httpClient.get<any>( 'http://localhost:8000/api/albarans/' + id, { headers });//llamada gett a apialbarans
  }

  editarSalida(id: number, salida: Salida) :Observable<any> {
    const headers = this.getHeaders();

    return this.httpClient.put<any>( 'http://localhost:8000/api/albarans/' + id, salida,  { headers });//llamada put a apialbarans pasando la salida en el cuerpo
  }

  eliminarSalida(id: number) {
    const headers = this.getHeaders();

    return this.httpClient.delete<any>( 'http://localhost:8000/api/albarans/' + id, { headers });//llamada delete a apialbarans
  }
}
