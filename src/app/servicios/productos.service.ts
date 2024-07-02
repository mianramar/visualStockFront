import { Injectable } from '@angular/core';
import { Producto } from '../modelos/producto';
import { BehaviorSubject } from 'rxjs';
import { Observable } from 'rxjs-compat';
import { HttpClient, HttpHeaders } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class ProductosService {

  constructor(private httpClient: HttpClient) {
  }

  // Para obtener los headers que usaremos en cada petición para autorizarnos
  private getHeaders(): HttpHeaders {
    let headers = new HttpHeaders();
    const usuarioRecuperado = window.sessionStorage.getItem('usuario'); // Recuperamos el usuario logueado
    if(usuarioRecuperado) { // Si recuperamos un usuario lo parseamos y usamos el accessToken en el header para autorizarnos en las peticiones
      const usuarioParseado = JSON.parse(usuarioRecuperado);
      headers = headers.set('Authorization', `Bearer ${usuarioParseado.accessToken}`);
    }
    return headers;
  }

  getProductos$(): Observable<any> {
    const headers = this.getHeaders();
    return this.httpClient.get<any>( 'http://localhost:8000/api/productos', { headers }); //llamada get a apiProductos
  }

  // Este método nos permite eliminar el producto elegido
  eliminarProducto(id: number) {
    const headers = this.getHeaders();

    return this.httpClient.delete<any>( 'http://localhost:8000/api/productos/' + id, { headers }); //llamada delete a apiProductos
  }

  engadirProducto(pProducto: Producto): Observable<any> {
      const headers = this.getHeaders();
  
      return this.httpClient.post<any>( 'http://localhost:8000/api/productos', pProducto, { headers }); //llamada post a apiProductos pasando el producto en el cuerpo
    }
  
    verDetalle(id: number) :Observable<any> {
      const headers = this.getHeaders();
  
      return this.httpClient.get<any>( 'http://localhost:8000/api/productos/' + id, { headers });//llamada get a apiProductos
    }
  
    editarProducto(id: number, producto: Producto) :Observable<any> {
      const headers = this.getHeaders();
  
      return this.httpClient.put<any>( 'http://localhost:8000/api/productos/' + id, producto,  { headers }); //llamada put a apiProductos pasando el producto en el cuerpo
    }
}
