import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Usuario } from '../modelos/usuario';
import { FormControl, ReactiveFormsModule, FormGroup, Validators, AbstractControl } from '@angular/forms';
import { UsuariosService } from '../servicios/usuarios.service';

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

  formularioUsuario: FormGroup; // Definimos o FormGroup asociado ao noso formulario HTML
  formularioUsuarioEdit: FormGroup;
  idUsuarioSeleccionado:number;
  formSubmitted = false; // Bandera para rastrear si el formulario ha sido enviado
  formEditSubmitted = false;

  constructor( 
    private servizoUsuarios: UsuariosService) { //Inicializamos los formularios con validaciones
    this.formularioUsuario = new FormGroup({
      nombre: new FormControl('', [Validators.required]),
      apellido: new FormControl('', [Validators.required]),
      rol: new FormControl('', [Validators.required]),
      name: new FormControl('', [Validators.required]),
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required]),
      confirmPassword: new FormControl('', [Validators.required])
    }, { validators: this.passwordsMatchValidator });

    this.formularioUsuarioEdit = new FormGroup({
      nombre: new FormControl('', [Validators.required]),
      apellido: new FormControl('', [Validators.required]),
      rol: new FormControl('', [Validators.required]),
      name: new FormControl('', [Validators.required]),
      email: new FormControl('', [Validators.required, Validators.email])
    });
  }

    // Validación para verificar que las contraseñas coinciden
    passwordsMatchValidator(control: AbstractControl): { [key: string]: boolean } | null {
      const password = control.get('password');
      const confirmPassword = control.get('confirmPassword');
      if (password && confirmPassword && password.value !== confirmPassword.value) {
        return { 'passwordMismatch': true };
      }
      return null;
    }

  // Este método execútase cando a compoñente está lista para ser cargada.
  ngOnInit(): void {
    this.cargarUsuarios();
  }

  cargarUsuarios() { // Llammamos a servizoUsuarios para obtener el listado de usuarios que guardamos en listaxeUsuarios
    this.servizoUsuarios.getUsuarios$().subscribe((usuarios) => {
      console.log(usuarios);
      this.listaxeUsuarios = usuarios;
    });
  }

  // Método para borrar usuario
  borrarUsuario(id: number){
    const confirmacion = window.confirm('¿Está seguro de que quiere eliminar el usuario?');//Confirmacion para eliminar
    if (confirmacion) {
      this.servizoUsuarios.eliminarUsuario(id).subscribe({//Llamamos a servizoUsuarios para eliminar el usuario pasando el id
        next: (respuesta) => {
          if (respuesta && respuesta.error) {
            // Si la respuesta contiene un campo error, mostrar un alert
            window.alert('Error: ' + respuesta.error);
          } else if (respuesta) {
            //Eliminamos el usuario de la lista local
            this.listaxeUsuarios = this.listaxeUsuarios.filter(usuario => usuario.id !== id);
            window.alert(respuesta.mensaje);
          }
        },
        error: (error) => {
          // Mostramos el error
          window.alert(error.error.mensaje);
        }
      });
    }
  }

  // Método para guardar un nuevo usuario
  nuevoUsuario(){
    this.formSubmitted = true; // Marcar que el formulario ha sido enviado

    if (this.formularioUsuario.valid) { //Si el formulario es valido
      const formData = this.formularioUsuario.value;
      console.log(formData);
       this.servizoUsuarios.engadirUsuario(formData).subscribe({ // Llamamos a servizoUsuarios para añadir un nuevousuario pasando como parametro los valores del formulario
        next: (respuesta) => {
            window.alert("El usuario se ha creado correctamente");
            this.cargarUsuarios();//Volvemos a cargar el listado de usuarios
            this.cerrarModal();//Cerramos el modal de usuario
            this.formSubmitted = false;
            this.formularioUsuario.reset(); //Reseteamos el formulario de nuevo usuario
        },
        error: (error) => {
          console.log(error);
          // Mostramos el error
          window.alert(error.error.errors);
          this.cerrarModal();
          this.formSubmitted = false;
        }
      });
    } else {
      this.mensajeError = 'Por favor, corrija los errores en el formulario.';
    }
  }

  escogerUsuario(id:number){ //Llamamos a este método cuando pulsamos en editar en el listado

    this.idUsuarioSeleccionado = id; //Guardamos su id
    this.servizoUsuarios.getUsuario$(id).subscribe((usuarioSeleccionado) => { //Llamamos al servizoUsuario getusuario para obtener los detalles del usuario
      if (usuarioSeleccionado) {
        this.formularioUsuarioEdit.patchValue({ // Seteamos el formulario con los campos del usuario recuperado
          nombre: usuarioSeleccionado.perfil.nombre,
          apellido: usuarioSeleccionado.perfil.apellido,
          rol: usuarioSeleccionado.rol,
          name: usuarioSeleccionado.name,
          email: usuarioSeleccionado.email
        });
      }
    });


  }

  cerrarModal(): void {
    let botonCerrar:HTMLElement= document.getElementById('cerrarModal') as HTMLElement;
    //Simulamos el click del boton cerrar
    botonCerrar.click();
  }

  cerrarModalEdit(): void {
    let botonCerrar:HTMLElement= document.getElementById('cerrarModalEdit') as HTMLElement;
    //Simulamos el click del boton cerrar
    this.formEditSubmitted = false; // Marcar que el formulario ha sido enviado

    botonCerrar.click();
  }


  editarUsuario() {
    this.formEditSubmitted = true; // Marcar que el formulario ha sido enviado

    const formData = this.formularioUsuarioEdit.value;

    if (this.formularioUsuarioEdit.valid) {
    this.servizoUsuarios.editarUsuario(this.idUsuarioSeleccionado, formData).subscribe({ //Llamamos a servizoUsuarios editarusuario pasando el id seleccionado previamente en escoger usuario y el formulario
      next: (respuesta) => {
          window.alert("El usuario se ha modificado correctamente");
          this.cargarUsuarios(); //Volvemos a cargar usuario y cerramos el modal
          this.cerrarModalEdit();
          
      },
      error: (error) => {
        // Mostramos el error
        window.alert(error.error.errors);
        this.cerrarModalEdit();
      }
    });
  } else {
    this.mensajeError = 'Por favor, corrija los errores en el formulario.';
  }

  }

}
