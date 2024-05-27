import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Usuario } from '../modelos/usuario';
import { LoginService } from '../servicios/servizo-login.service';
import { FormControl, ReactiveFormsModule, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-administracion',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './administracion.component.html',
  styleUrl: './administracion.component.css'
})
export class AdministracionComponent implements OnInit{
  //Creamos el listado de usuarios como un array de usuarios
  listaxeUsuarios: Usuario[];
  // Creamos variables para usarla como bandera
  editar=false;
  mostrarUsuarios=true;
  // variables para mostrar los errores en el formulario
  mensajeError:string;
  // Creamos variable para guardar el nombre antiguo en caso de cambiarlo
  nombreAntiguo='';
  formularioUsuario: FormGroup; // Definimos o FormGroup asociado al formulario HTML

  constructor(private servizoLogin: LoginService, private direccionador: Router) {
    this.formularioUsuario = new FormGroup({
      usuario: new FormControl(),
      contrasinal: new FormControl(),
      rol: new FormControl()
    })
  }

  // Este método execútase cando a compoñente está lista para ser cargada. Vainos permitir suscribirnos aos cambios do array de módulos que hai no servizo
  ngOnInit(): void {
    this.servizoLogin.getUsuarios$().subscribe((usuarios) => {
      this.listaxeUsuarios = usuarios;
    }); // Facemos que o array listaxeUsuarios sexa permanentemente igual ao array de usuarios que hai no servizo mediante unha suscripción
  }

  // Método para borrar usuario
  borrarUsuario(usuario: Usuario){
    this.servizoLogin.borrarUsuario(usuario);
  }

  // Método para guardar un nuevo usuario
  nuevoUsuario(){
    this.mensajeError = this.servizoLogin.engadirUsuario(this.formularioUsuario.value);
    if(this.mensajeError == null) { // Si no hay errores volvemos a la tabla de usuarios
      this.mostrarUsuarios = !this.mostrarUsuarios;
    }
  }

  // Método para guardar los cambios de un usuario
  modificarUsuario(){
    this.servizoLogin.modificarUsuario(this.formularioUsuario.value, this.nombreAntiguo);
    this.mostrarUsuarios = !this.mostrarUsuarios;
  }

  // Método para mostrar el formulario de editar y ocultar la tabla de todos los usuarios
  mostrarFormularioEditar(usuario: Usuario){
    this.editar = true;
    this.mostrarUsuarios = false;
    // Recuperamos los datos del usuario seleccionado
    this.formularioUsuario.get('usuario').setValue(usuario.usuario);
    this.formularioUsuario.get('contrasinal').setValue(usuario.contrasinal);
    this.formularioUsuario.get('rol').setValue(usuario.rol);
    // Tenemos que guardar el nombre original, por si cambiamos este parámetro, poder encontrarlo en usuarios (ya que lo buscamos por este parámetro)
    this.nombreAntiguo = usuario.usuario;
  }

  // Método para mostrar el formulario para crear un nuevo usuario
  mostrarFormularioCrear(){
    this.editar = false;
    this.formularioUsuario.reset(); // reseteamos el form, para eliminar datos anteriores
    this.mostrarUsuarios = false;
  }

  navegarPortada() { // Funcionalidad del botón para redireccionar a Almacén
    this.direccionador.navigate(['/portada']); 
  }
}
