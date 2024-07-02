import { Injectable } from '@angular/core';
import { Entrada } from '../modelos/entrada';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Empresa } from '../modelos/empresa';


@Injectable({
  providedIn: 'root'
})
export class EmpresasService {

  constructor(private httpClient: HttpClient) {

  }

  private getHeaders(): HttpHeaders {
    let headers = new HttpHeaders();
    const usuarioRecuperado = window.sessionStorage.getItem('usuario'); // Recuperamos el usuario logueado del sessionstorage
    if(usuarioRecuperado) {
      const usuarioParseado = JSON.parse(usuarioRecuperado);
      headers = headers.set('Authorization', `Bearer ${usuarioParseado.accessToken}`); //Seteamos la cabecera authorization con bearer + token
    }
    return headers;
  }

  // Este método permite obter un observable do array de productos
  getEmpresas$() :Observable<any>{
    const headers = this.getHeaders(); //obtenemos cabeceras
    return this.httpClient.get<any>( 'http://localhost:8000/api/empresas', { headers }); //llamada get a apiempresas
  }


  engadirEmpresa(empresa: Empresa):Observable<any> {
    const headers = this.getHeaders();

    return this.httpClient.post<any>( 'http://localhost:8000/api/empresas', empresa, { headers });//llamada post a apiEmpresas pasando empresa en el cuerpo
  }

  editarEmpresa(id: number, empresa:Empresa) :Observable<any> {
    const headers = this.getHeaders();

    return this.httpClient.put<any>( 'http://localhost:8000/api/empresas/' + id, empresa, { headers }); //llamada put a apiEmpresas pasando empresa en el cuerpo
  }

  eliminarEmpresa(id: number) {
    const headers = this.getHeaders();

    return this.httpClient.delete<any>( 'http://localhost:8000/api/empresas/' + id, { headers }); //llamada delete a apiEmpresas 
  }


}
