import { Injectable } from '@angular/core';
import * as salidasJson from '../../assets/data/salidas.json';
import { BehaviorSubject, Observable } from 'rxjs';
import { Salida } from '../modelos/salida';


@Injectable({
  providedIn: 'root'
})
export class SalidasService {

  //Cargamos el ficheros productos.json en la variable productos
  salidas: Salida[] = salidasJson.salidas;
  // Definimos un subject que emitirá o array de productos para todos os elementos que estean suscritos a el
  salidas$: BehaviorSubject<Salida[]>;

  constructor() {
    this.salidas$ = new BehaviorSubject(this.salidas);
  }

  // Este método permite obter un observable do array de productos
  getSalidas$(): Observable<Salida[]> {
    return this.salidas$.asObservable(); // Devolvemos o Subject como observable para que outros elementos poidan suscribirse ao mesmo
  }

  // Este método permitirá dar de alta novos usuarios ao tempo que informará aos suscriptores das novidades
  engadirSalida(pSalida: Salida): string {
    // Buscamos el indice del usuario que coincida con el nombre del usuario buscado
    const indiceSalida = this.salidas.findIndex(i => i.numero === pSalida.numero);
    // Introducimos un if para ver si encuentra un usuario, (si es -1 significa que no lo encontró)
    if(indiceSalida !== -1){
      // si es diferente a -1, habrá encontrado un usuario y mandaremos un mensaje diciendo que el usuario ya existe.
      return "Ya existe este usuario";
    } else { // En caso de no encontrar al usuario
      this.salidas.push(pSalida); // Engadimos o novo usuario ao array
      this.salidas$.next(this.salidas); // Enviamos a todos os suscriptores o array actualizado
      return null; // no devuelve error
    }
  }


  // Este método cambiará el valor de isEliminado para mostrarlo de color rojo
  eliminarSalida(pNumero: number): string {
    // Buscamos el indice de la entrada que coincida con el numero pasado
    const indiceEntrada = this.salidas.findIndex(i => i.numero === pNumero);
    // Introducimos un if para ver si encuentra un usuario, (si es -1 significa que no lo encontró)
    if(indiceEntrada !== -1){
      // si es diferente a -1, habrá encontrado una entrada y la modifica
      this.salidas[indiceEntrada].isEliminado = true; // Cambiamos el valor
      this.salidas$.next(this.salidas); // Enviamos a todos os suscriptores o array actualizado
      return null; // no devuelve error
    } else { // En caso de no encontrar al usuario
      return "No se encuentra la entrada";
    }
  }

}
