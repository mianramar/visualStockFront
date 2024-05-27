import { Injectable } from '@angular/core';
import * as materialesJson from '../../assets/data/materiales.json';
import { Material } from '../modelos/material';
import { BehaviorSubject, Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class MaterialesService {

  //Cargamos el ficheros materiales.json en la variable materiales
  materiales: Material[] = materialesJson.materiales;
  // Definimos un subject que emitirá o array de materiales para todos os elementos que estean suscritos a el
  materiales$: BehaviorSubject<Material[]>;

  constructor() {
    this.materiales$ = new BehaviorSubject(this.materiales);
  }

  // Este método permite obter un observable do array de materiales
  getMateriales$(): Observable<Material[]> {
    return this.materiales$.asObservable(); // Devolvemos o Subject como observable para que outros elementos poidan suscribirse ao mesmo
  }
}
