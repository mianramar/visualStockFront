import { Injectable } from '@angular/core';
import { Entrada } from '../modelos/entrada';
import * as entradasJson from '../../assets/data/entradas.json';
import { BehaviorSubject, Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class EntradasService {

  //Cargamos el ficheros productos.json en la variable productos
  entradas: Entrada[] = entradasJson.entradas;
  // Definimos un subject que emitirá o array de productos para todos os elementos que estean suscritos a el
  entradas$: BehaviorSubject<Entrada[]>;

  constructor() {
    this.entradas$ = new BehaviorSubject(this.entradas);
  }

  // Este método permite obter un observable do array de productos
  getEntradas$(): Observable<Entrada[]> {
    return this.entradas$.asObservable(); // Devolvemos o Subject como observable para que outros elementos poidan suscribirse ao mesmo
  }

  // Este método permitirá dar de alta novos usuarios ao tempo que informará aos suscriptores das novidades
  engadirEntrada(pEntrada: Entrada): string {
    // Buscamos el indice del usuario que coincida con el nombre del usuario buscado
    const indiceEntrada = this.entradas.findIndex(i => i.numero === pEntrada.numero);
    // Introducimos un if para ver si encuentra un usuario, (si es -1 significa que no lo encontró)
    if(indiceEntrada !== -1){
      // si es diferente a -1, habrá encontrado un usuario y mandaremos un mensaje diciendo que el usuario ya existe.
      return "Ya existe este usuario";
    } else { // En caso de no encontrar al usuario
      this.entradas.push(pEntrada); // Engadimos o novo usuario ao array
      this.entradas$.next(this.entradas); // Enviamos a todos os suscriptores o array actualizado
      return null; // no devuelve error
    }
  }


  // Este método cambiará el valor de isEliminado para mostrarlo de color rojo
  eliminarEntrada(pNumero: number): string {
    // Buscamos el indice de la entrada que coincida con el numero pasado
    const indiceEntrada = this.entradas.findIndex(i => i.numero === pNumero);
    // Introducimos un if para ver si encuentra un usuario, (si es -1 significa que no lo encontró)
    if(indiceEntrada !== -1){
      // si es diferente a -1, habrá encontrado una entrada y la modifica
      this.entradas[indiceEntrada].isEliminado = true; // Cambiamos el valor
      this.entradas$.next(this.entradas); // Enviamos a todos os suscriptores o array actualizado
      return null; // no devuelve error
    } else { // En caso de no encontrar al usuario
      return "No se encuentra la entrada";
    }
  }

}
