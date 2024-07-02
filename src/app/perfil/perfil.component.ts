import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { MaterialesService } from '../servicios/materiales.service';
import { CommonModule } from '@angular/common';
import { FormControl, FormGroup, ReactiveFormsModule ,Validators} from '@angular/forms';
import { UsuariosService } from '../servicios/usuarios.service';


@Component({
  selector: 'app-perfil',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './perfil.component.html',
  styleUrl: './perfil.component.css'
})
export class PerfilComponent implements OnInit{

    formularioUsuario: FormGroup; // Definimos o FormGroup asociado ao noso formulario HTML
    mensajeError:string;
    host:string = 'http://localhost:8000/'; //Dominio del servidor para la ruta de la imagen
    rutaImagen:string ;
    archivoSeleccionado: File | null = null; //Tipo file pasa subir imagen
    formSubmitted = false; // Bandera para rastrear si el formulario ha sido enviado


    constructor(private servizoUsuarios: UsuariosService){ //inicializamos el formulariousuario con sus validaciones
        this.formularioUsuario = new FormGroup({
            nombre: new FormControl('', [Validators.required]),
            apellido: new FormControl('', [Validators.required]),
            rol: new FormControl('', [Validators.required]),
            name: new FormControl('', [Validators.required]),
            email: new FormControl('', [Validators.required, Validators.email])
          });
    }

    ngOnInit(): void {
        const usuarioRecuperado = window.sessionStorage.getItem('usuario'); // Recuperamos el usuario logueado del sessionstorage
        if(usuarioRecuperado) {
          const usuarioParseado = JSON.parse(usuarioRecuperado);
          this.servizoUsuarios.getUsuario$(usuarioParseado.id).subscribe((usuarioSeleccionado) => { //Llamamos a servizoUsuarios getUsuario para obtener los datos del usuario y de su perfil
            if (usuarioSeleccionado) {
              this.formularioUsuario.patchValue({
                nombre: usuarioSeleccionado.perfil.nombre,
                apellido: usuarioSeleccionado.perfil.apellido,
                rol: usuarioSeleccionado.rol,
                name: usuarioSeleccionado.name,
                email: usuarioSeleccionado.email
              });
            }
            this.rutaImagen = this.host + usuarioSeleccionado.perfil.imagen; //Construimos la ruta de la imagen
          });
        }

      }

      editarUsuario()  {
        const formData = this.formularioUsuario.value; 
        this.formSubmitted = true;
        if (this.formularioUsuario.valid) { //Si el form es valido
          const usuarioRecuperado = window.sessionStorage.getItem('usuario'); // Recuperamos el usuario logueado del sessionstorage
          if(usuarioRecuperado) {
              const usuarioParseado = JSON.parse(usuarioRecuperado);
              this.servizoUsuarios.editarUsuario(usuarioParseado.id, formData).subscribe({ //Llamamos a servizoUsuarios editarUsuario pasando el id del usuario logeado y el formulario
              next: (respuesta) => {
                  window.alert("El usuario se ha modificado correctamente");
                  this.formSubmitted = false; 
              },
              error: (error) => {
                  // Mostramos el error
                  window.alert(error.error.errors);
                  this.formSubmitted = false;
              }
              });
           }   
        } else {
          this.mensajeError = 'Por favor, corrija los errores en el formulario.';
        }

    }

    onFileSelected(event: any) {
        this.archivoSeleccionado = event.target.files[0] as File; //evento cuando se selecciona un fichero
      }
    
      subirImagen() {
        if (this.archivoSeleccionado) { //Si se ha seleccionado previamente el fichero
          this.servizoUsuarios.editarImagen(this.archivoSeleccionado).subscribe( //Llamamos a servizoUsuarios editarimagen pasando el fichero
            (response) => {
              this.rutaImagen = this.host + response; //construimos la ruta de la imagen
            },
            (error) => {
              console.error('Error al subir la imagen', error);
              
            }
          );
        }
      }
}