import { Injectable } from '@angular/core';
import { Producto } from '../modelos/producto';
import * as productosJson from '../../assets/data/productos.json';
import { BehaviorSubject } from 'rxjs';
import { Observable } from 'rxjs-compat';

@Injectable({
  providedIn: 'root'
})
export class ProductosService {


  //Cargamos el ficheros productos.json en la variable productos
  productos: Producto[] = productosJson.productos;
  // Definimos un subject que emitirá o array de productos para todos os elementos que estean suscritos a el
  productos$: BehaviorSubject<Producto[]>;

  constructor() {
    this.productos$ = new BehaviorSubject(this.productos);
  }

  // Este método permite obter un observable do array de productos
  getProductos$(): Observable<Producto[]> {
    return this.productos$.asObservable(); // Devolvemos o Subject como observable para que outros elementos poidan suscribirse ao mesmo
  }


  // Este método permitirá dar de alta novos usuarios ao tempo que informará aos suscriptores das novidades
  engadirProducto(pProducto: Producto): string {
    // Buscamos el ultimo id
    let ultimoId = 0;

    this.productos.forEach(producto => {
        if (producto.id > ultimoId) {
            ultimoId = producto.id;
        }
    });
    //Le sumamos 1 para obtener el siguiente id
    ultimoId += 1;

    //Se lo asignamos al producto
    pProducto.id = ultimoId;

    this.productos.push(pProducto); // Engadimos o novo producto ao array
    this.productos$.next(this.productos); // Enviamos a todos os suscriptores o array actualizado
    return null; // no devuelve error

  }
}
