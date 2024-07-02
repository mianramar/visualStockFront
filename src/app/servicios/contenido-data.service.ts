import { Injectable } from '@angular/core';
import * as departamentosJson from '../../assets/departamentos.json';
import { Departamento } from '../modelos/departamento';
import { BehaviorSubject, Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';



//Creamos un servicio para leer ficheros json
@Injectable({
  providedIn: 'root'
})
export class ContenidoDataService {

  constructor(private httpClient: HttpClient) {

  }

  private getHeaders(): HttpHeaders {
    let headers = new HttpHeaders();
      headers = headers.set('accept', `application/json`); //header para aceptar JSON
    return headers;
  }


  getDatosAemet$() :Observable<any>{
    const headers = this.getHeaders();
    return this.httpClient.get<any>( 'http://localhost:8000/api/aemet', { headers }); //lamada get a la API
  }
}