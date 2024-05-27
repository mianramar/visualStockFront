import { Injectable } from '@angular/core';
import * as departamentosJson from '../../assets/data/departamentos.json';
import { Departamento } from '../modelos/departamento';
import { BehaviorSubject, Observable } from 'rxjs';



//Creamos un servicio para leer ficheros json
@Injectable({
  providedIn: 'root'
})
export class ContenidoDataService {

  //Cargamos el ficheros departamentos.json en la variable datos
  datos: Departamento[] = departamentosJson.departamentos;

  datos$: BehaviorSubject<Departamento[]>; // Definimos un subject que emitirá o array de usuarios para todos os elementos que estean suscritos a el
  
  constructor() {
    this.datos$ = new BehaviorSubject(this.datos); // Inicialmente non hai suscriptores
  }
  
  // Este método permite obter un observable do array de departamentos (vai permitir suscribirse aos cambios do array de departamentos)
  getDepartamentos$(): Observable<Departamento[]> {
    return this.datos$.asObservable(); // Devolvemos o Subject como observable para que outros elementos poidan suscribirse ao mesmo
  }
}