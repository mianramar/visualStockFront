import { Injectable } from '@angular/core';
import * as usuariosJson from '../../assets/data/usuarios.json';
import { Usuario } from '../modelos/usuario';
import { BehaviorSubject, Observable } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  //Cargamos el ficheros usuarios.json en la variable datos
  usuarios: Usuario[] = usuariosJson.usuarios; //Definimos un array que contendrá os usuarios del archivo json
  
  usuarios$: BehaviorSubject<Usuario[]>; // Definimos un subject que emitirá o array de usuarios para todos os elementos que estean suscritos a el

  usuario = {  
    usuario: '',
    contrasinal: '',
    rol: ''
  };
  private usuarioLogeadoSource = new BehaviorSubject<Usuario>(this.usuario);
  usuarioLogeado$: Observable<Usuario> = this.usuarioLogeadoSource.asObservable();


  constructor(private direccionador: Router) {
    this.usuarios$ = new BehaviorSubject(this.usuarios); // Inicialmente non hai suscriptores
  }

  // Este método permitirá dar de alta novos usuarios ao tempo que informará aos suscriptores das novidades
  engadirUsuario(pUsuario: Usuario): string {
    // Buscamos el indice del usuario que coincida con el nombre del usuario buscado
    const indiceUsuario = this.usuarios.findIndex(i => i.usuario === pUsuario.usuario);
    // Introducimos un if para ver si encuentra un usuario, (si es -1 significa que no lo encontró)
    if(indiceUsuario !== -1){
      // si es diferente a -1, habrá encontrado un usuario y mandaremos un mensaje diciendo que el usuario ya existe.
      return "Ya existe este usuario";
    } else { // En caso de no encontrar al usuario
      this.usuarios.push(pUsuario); // Engadimos o novo usuario ao array
      this.usuarios$.next(this.usuarios); // Enviamos a todos os suscriptores o array actualizado
      return null; // no devuelve error
    }
  }

  // Este método permite obter un observable do array de usuarios (vai permitir suscribirse aos cambios do array de usuarios)
  getUsuarios$(): Observable<Usuario[]> {
    return this.usuarios$.asObservable(); // Devolvemos o Subject como observable para que outros elementos poidan suscribirse ao mesmo
  }

  setUsuarioLogeado(usuario: Usuario) {
    this.usuarioLogeadoSource.next(usuario);
  }

  getUsuarioLogeado$(): Observable<Usuario> {
    return this.usuarioLogeado$;
  }

  // Funcion para modificar usuario, pasándole un usuario y el nombre antiguo en caso de que cambie, porque sino no nos encontraria ese usuario al buscar por nombre
  modificarUsuario(pUsuario: Usuario, nombreAntiguo: string) {
    // Buscamos el indice del usuario que coincida con el usuario buscado
    const indiceUsuario = this.usuarios.findIndex(i => i.usuario === nombreAntiguo);

    // Introducimos un if para asegurarnos de que encuentra el usuario, (si es -1 significa que no lo encontró)
    if(indiceUsuario !== -1){
      // si es diferente a -1, habrá encontrado al usuario y lo sustituimos por el nuevo "objeto" usuario
      this.usuarios[indiceUsuario] = pUsuario;
    }
  }

  borrarUsuario(pUsuario: Usuario) {
    // Buscamos el indice del usuario que coincida con el usuario buscado
    const indiceUsuario = this.usuarios.findIndex(i => i.usuario === pUsuario.usuario);

    // Introducimos un if para asegurarnos de que encuentra el usuario, (si es -1 significa que no lo encontró)
    if(indiceUsuario !== -1){
      // Habrá encontrado al usuario y lo hacemos un splice para eliminarlo
      this.usuarios.splice(indiceUsuario, 1);
    }
  }

  comprobarLogin(pUsuario: Usuario):string {
    // Buscamos el indice del usuario que coincida con el usuario buscado
    const indiceUsuario = this.usuarios.findIndex(i => i.usuario === pUsuario.usuario);

    // Introducimos un if para asegurarnos de que encuentra el usuario, (si es -1 significa que no lo encontró)
    if(indiceUsuario !== -1){ // Exsite el usuario
      // Guardamos el objeto usuario en una variable, que tambien nos servirá para comprobar en /administración si el usuario es admin
      const usuarioEncontrado = this.usuarios[indiceUsuario];

      if(usuarioEncontrado.contrasinal == pUsuario.contrasinal) { 
        // Si el contrasinal es igual al contrasinal del usuario, guardamos en sessionstorage y nos redirecciona a "/portada"
        window.sessionStorage.setItem('usuario', JSON.stringify(usuarioEncontrado));
        this.setUsuarioLogeado(usuarioEncontrado); 
        this.direccionador.navigate(['/portada']);
        return null; // Si no hay errores, devolvemos un nulo
      } else { // si no coincide, mensaje de contraseña incorrecta
        return "Contraseña incorrecta";
      };
    } else { // En caso de no encontrar al usuario, mensaje de error
      return "No existe este usuario";
    }
  }

  logout(): void {
    // Para eliminar el usuario del sessionStorage y redireccionar a "login"
    window.sessionStorage.removeItem('usuario');
    let usuario = {  
      usuario: '',
      contrasinal: '',
      rol: ''
    };
    this.setUsuarioLogeado(usuario);
    this.direccionador.navigate(['/login']);
  }
}

