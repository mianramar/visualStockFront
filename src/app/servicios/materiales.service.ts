import { Injectable } from '@angular/core';
import { Material } from '../modelos/material';
import { BehaviorSubject, Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class MaterialesService {

  // Para obtener los headers que usaremos en cada petición para autorizarnos
  private getHeaders(): HttpHeaders {
    let headers = new HttpHeaders();
    const usuarioRecuperado = window.sessionStorage.getItem('usuario'); // Recuperamos el usuario logueado
    if(usuarioRecuperado) {
      const usuarioParseado = JSON.parse(usuarioRecuperado);
      headers = headers.set('Authorization', `Bearer ${usuarioParseado.accessToken}`);
    }
    return headers;
  }

  constructor(private httpClient: HttpClient) {
  }

  getMateriales$(): Observable<any> {
    const headers = this.getHeaders();
    return this.httpClient.get<any>( 'http://localhost:8000/api/materials', { headers });  //llamada get a apiMaterials 
  }

  editarMaterial(id: number, material:Material) :Observable<any> {
    const headers = this.getHeaders();

    return this.httpClient.put<any>( 'http://localhost:8000/api/materials/' + id, material, { headers }); //llamada put a apiMaterialss pasando el material en el cuerpo
  }

  eliminarMaterial(id: number) {
    const headers = this.getHeaders();

    return this.httpClient.delete<any>( 'http://localhost:8000/api/materials/' + id, { headers }); //llamada delete a apiMaterials
  }

  nuevoMaterial(pMaterial: Material):Observable<any> {
    const headers = this.getHeaders();

    return this.httpClient.post<any>( 'http://localhost:8000/api/materials', pMaterial, { headers });//llamada post a apiMaterialss pasando el material en el cuerpo
  }
}
